const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const disc = [
  "Connect to the MongoDB server to perform a condition-based data deletion operation.",
  "Fetch all documents from the specified collection before applying filtering criteria.",
  "Dynamically apply conditions to filter data based on field values and operators.",
  "Use MongoDB’s query operators like '<', '>', '==', and '!=' to filter documents.",
  "Ensure uniqueness of the data by using a Set to avoid duplicates when filtering.",
  "Delete documents that match the specified filter conditions from the collection.",
  "Convert the filter results into an array and perform deletion based on matching documents.",
  "Delete documents from the collection by matching conditions on fields like 'age', 'name', etc.",
  "Return the number of affected documents after performing the deletion operation.",
  "Handle errors gracefully during data deletion and filtering operations, ensuring proper logging.",
  "Use MongoDB’s `deleteOne` method to remove documents that match the condition.",
  "Serialize and deserialize documents to ensure correct object handling during the operation.",
  "Dynamically generate filter conditions based on the provided attributes and values.",
  "Optimize database operations by limiting the data retrieval to only those matching the conditions.",
  "Ensure that the MongoDB client is properly closed after the operation to free up resources."
]

async function readConditionData(nameOfDB, nameOfCollection, atrs) {
  const client = new MongoClient(uri);

  try {
    // Connect to the database
    await client.connect();

    // Get database and collection references
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);

    // Fetch all documents
    const res = await collection.find({}).toArray();

    // Use a Set to ensure uniqueness
    const uniqueResults = new Set();

    // Apply filters dynamically
    const response = res.filter((doc) => {
      const matches = atrs.every(({ field, operator, value }) => {
        if (Array.isArray(value)) {
          // Handle array of values (like `$in` in MongoDB)
          if (operator === "==") {
            return value.includes(doc[field]);
          } else if (operator === "!=") {
            return !value.includes(doc[field]);
          } else {
            throw new Error(`Unsupported operator for array: ${operator}`);
          }
        } else {
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

async function DeleteConditionBased(nameOfDB, nameOfCollection, atrs) {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);

    // Get data to update based on conditions
    const dataToUpdate = await readConditionData(
      nameOfDB,
      nameOfCollection,
      atrs
    );
    const response = [];

    for (const data of dataToUpdate) {
      const filter = { _id: new ObjectId(data._id) };

      const result = await collection.deleteOne(filter);
      response.push(result);
    }
    console.log(`${response.length} data affected!`);

    // Return the update results
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  } finally {
    // Ensure the client is closed
    await client.close();
  }
}

// Usage Example
(async () => {
  const atrs = [{ field: "age", operator: "<", value: 100 }];

  const results = await DeleteConditionBased("jenil", "pamrar", atrs);
  console.log(results);
})();
