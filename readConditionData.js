const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const disc = [
  "Establish a connection with MongoDB to fetch documents based on specified conditions.",
  "Ensure that both the database and collection names are provided correctly for successful data retrieval.",
  "Fetch all documents from the specified collection using the `find` method, converting them into an array for easier processing.",
  "Use a `Set` to ensure unique documents are returned, preventing duplicate entries in the result.",
  "Dynamically apply filter conditions to each document, allowing for flexible queries based on various operators and values.",
  "Handle array-based conditions (e.g., `$in` operator in MongoDB) to check if the document field's value is within a set of values.",
  "Support multiple operators like `==`, `!=`, `<`, `>`, `<=`, and `>=` for flexible and complex queries.",
  "Throw an error if an unsupported operator is provided for filtering conditions, ensuring proper validation.",
  "Ensure that all filter criteria are met by checking each field, operator, and value dynamically for each document.",
  "Return only those documents that satisfy all the provided filtering conditions.",
  "Serialize documents into a string format using `JSON.stringify` to maintain uniqueness and avoid reference duplication.",
  "Convert the `Set` back to an array and parse it to retrieve the filtered documents with unique results.",
  "Implement robust error handling to catch and log any issues that may arise during the data filtering process.",
  "Ensure that MongoDB connections are properly closed after the operation to prevent resource leaks.",
  "Return an empty array if an error occurs or no documents match the filtering conditions, providing consistent output."
]

async function readConditionData(nameOfDB, nameOfCollection, atrs) {
  try {

    await client.connect();

    
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);


    const res = await collection.find({}).toArray();

    const uniqueResults = new Set();

    const response = res.filter((doc) => {
      const matches = atrs.every(({ field, operator, value }) => {
        if (Array.isArray(value)) {
   
          if (operator === "==") {
            return value.includes(doc[field]);
          } else if (operator === "!=") {
            return !value.includes(doc[field]);
          } else {
            throw new Error(`Unsupported operator for array: ${operator}`);
          }
        } else {
          // Handle regular single-value conditions
          switch (operator) {
            case "<":
              return doc[field] < value;
            case "<=":
              return doc[field] <= value;
            case ">":
              return doc[field] > value;
            case ">=":
              return doc[field] >= value;
            case "==":
              return doc[field] == value;
            case "!=":
              return doc[field] != value;
            default:
              throw new Error(`Unsupported operator: ${operator}`);
          }
        }
      });

      // If the document matches, add it to the Set
      if (matches) {
        uniqueResults.add(JSON.stringify(doc)); // Serialize document to avoid object reference issues
      }

      return matches;
    });

    // Convert the Set back to an array and return unique results
    return Array.from(uniqueResults).map((doc) => JSON.parse(doc));
  } catch (err) {
    console.error("Error filtering data:", err);
    return [];
  } finally {
    // Ensure the client is closed after the operation
    await client.close();
  }
}

// Usage example
(async () => {
  // Define filtering criteria
  const filters = [
    { field: "accountName ", operator: "==", value: "exampleEmail@gmail.com" },
  ];

  const res = await readConditionData("SocailMedia", "posts", filters);
  console.log(res);
})();
module.exports = readConditionData;
