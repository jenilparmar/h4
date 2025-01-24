const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const descriptions = [
  "Create a new database with the specified name.",
  "Initialize a database instance.",
  "Generate a database for data storage.",
  "Establish a database named by the user.",
  "Set up a fresh database.",
  "Make a database ready for use.",
  "Design a database framework.",
  "Prepare a database environment.",
  "Construct a database for application data.",
  "Deploy a new database for operations.",
  "Spin up a database instance.",
  "Provision a database resource.",
  "Activate a database for the application.",
  "Kickstart a database for storage.",
  "Build a database for managing information.",
  "Start a database with a custom name.",
  "Formulate a database schema.",
  "Bring a new database to life.",
  "Add a database to the system.",
  "Configure a database for future use.",
  "Launch a database service.",
  "Initiate a database environment.",
  "Activate a database connection.",
  "Fabricate a database as specified.",
  "Develop a database structure.",
  "Install a new database resource.",
  "Compose a database to manage data.",
  "Assemble a database infrastructure.",
  "Produce a database resource.",
  "Allocate resources for a new database.",
  "Commission a new database system.",
  "Introduce a database instance.",
  "Establish a database schema.",
  "Generate a data storage system.",
  "Start an instance of the database.",
  "Define the database architecture.",
  "Enable a database for operations.",
  "Craft a database for handling queries.",
  "Roll out a new database setup.",
  "Create a database with user-defined parameters.",
  "Launch a new data repository.",
  "Deploy a managed database instance.",
  "Bring a custom-named database online.",
  "Boot up a database server.",
  "Instantiate a database with parameters.",
  "Set up a managed database solution.",
  "Start a new database engine.",
  "Design and initiate a database.",
  "Open a database session.",
  "Provision a managed database service.",
  "Construct a repository for storing data.",
  "Enable a new database to store data.",
  "Create and configure a database system.",
  "Set up a fresh database instance.",
  "Deploy a database structure for data handling.",
  "Launch a new data management system.",
  "Initialize a new database server.",
  "Prepare a database for query handling.",
  "Construct a database from scratch.",
  "Create a database dynamically.",
  "Generate a storage space for data.",
  "Form a database for storing records.",
  "Implement a database instance.",
  "Build a database for transactional data.",
  "Create a database accessible by users.",
  "Configure a storage system.",
  "Activate a new storage repository.",
  "Develop a database for managing queries.",
  "Generate a database for operational needs.",
  "Define a database for data processing.",
  "Set up a database with specific settings.",
  "Prepare a repository for managing records.",
  "Roll out a database service.",
  "Configure a new database for tasks.",
  "Introduce a new data handling system.",
  "Build a structure for storing information.",
  "Launch a data management service.",
  "Provision a new database server.",
  "Deploy a database schema.",
  "Bring a database resource online.",
  "Initialize a structured database.",
  "Generate a repository for application data.",
  "Spin up a service for database operations.",
  "Set up a data repository.",
  "Establish a structured storage system.",
  "Create a storage mechanism for information.",
  "Develop a platform for data queries.",
  "Design a structure for data storage.",
  "Launch a new data platform.",
  "Provision a data system.",
  "Assemble a database infrastructure.",
  "Start a repository for structured data.",
  "Activate a data-handling platform.",
  "Launch a repository for user data.",
  "Spin up a new database with parameters.",
  "Generate a platform for managing queries.",
  "Deploy a solution for structured storage.",
  "Start a dynamic database instance.",
  "Design and configure a data repository.",
  "Establish a space for user information.",
  "Provision a platform for database queries.",
  "Deploy a dynamic data repository.",
  "Create and launch a storage solution.",
  "Start a database to handle queries.",
  "Initialize a database system.",
  "Build a repository for records.",
  "Start a service for managing information.",
  "Develop a managed database engine.",
  "Activate a storage space.",
  "Initialize a structured repository.",
  "Build a service for data storage.",
  "Create and deploy a database system.",
  "Roll out a platform for data handling.",
  "Develop a scalable database instance.",
  "Provision a resource for database storage.",
  "Design and provision a database system.",
  "Construct a scalable data repository.",
  "Open a data storage service.",
  "Generate a managed storage instance.",
  "Create a structure for operational data.",
  "Start a scalable storage platform.",
  "Deploy a repository with user-defined settings.",
  "Design and activate a data solution.",
  "Prepare a service for handling queries.",
  "Establish a repository for records.",
  "Spin up a platform for structured storage.",
  "Launch a database management platform.",
  "Initiate a platform for data storage.",
  "Create a structure for scalable data.",
  "Deploy a storage engine.",
  "Bring online a data repository.",
  "Activate a repository for structured data.",
  "Set up a query-handling database.",
  "Start a repository for dynamic storage.",
  "Configure a scalable repository.",
  "Develop a solution for database queries.",
  "Provision a scalable database solution.",
  "Activate a new storage solution.",
  "Spin up a dynamic data engine.",
  "Prepare a managed database platform.",
  "Deploy a service for operational queries."
];

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
