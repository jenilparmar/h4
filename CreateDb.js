const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const descriptions = [
  "Create a new database and populate it with data.",
  "Set up a database with a specified name and collection, then insert records.",
  "Initialize a database, define a collection, and add documents to it.",
  "Generate a database and insert multiple entries into its collection.",
  "Build a database and populate its collection with provided information.",
  "Add a collection of data to a newly created database.",
  "Create a database, name a collection, and input an array of records.",
  "Insert multiple documents into a specified collection within a database.",
  "Design a database structure and populate it with an array of objects.",
  "Open a connection, create a database, and add data to a collection.",
  "Set up a database named dynamically and fill it with input data.",
  "Generate a collection inside a database and bulk insert records.",
  "Open or create a database and load initial data into a collection.",
  "Define a database schema and insert provided data into a collection.",
  "Initialize and populate a database with an array of objects.",
  "Construct a database, assign a collection, and load data into it.",
  "Insert provided data into a newly established collection in a database.",
  "Create and seed a database with an initial set of data records.",
  "Form a database structure, name a collection, and add multiple items.",
  "Create a database environment and insert data into its collection.",
  "Start a database, define a collection, and populate it with entries.",
  "Add an array of objects to a new or existing database collection.",
  "Set up a database system and bulk insert the provided data.",
  "Create a database with custom names and fill it with input arrays.",
  "Construct a database and add all given data to its primary collection.",
  "Generate a new database with a defined collection and data entries.",
  "Define a database, assign a collection, and load records into it.",
  "Launch a database instance, define a collection, and insert data.",
  "Configure a database and populate its collection with specified data.",
  "Start a database service, create a collection, and fill it with data.",
  "Generate a database and fill it with documents from an input array.",
  "Build a new database and insert provided entries into a collection.",
  "Insert a bulk of data into a freshly created collection in a database.",
  "Create a new database system and load data into its collection.",
  "Start a database and add an array of entries into its collection.",
  "Configure a database instance and insert the provided records.",
  "Initialize a database framework and populate it with input data.",
  "Start a database server, create a collection, and add documents.",
  "Build a new database and immediately populate it with entries.",
  "Insert data into a defined database and collection using arrays.",
  "Design a database setup and bulk insert documents into its collection.",
  "Create a database system and populate it with an array of records.",
  "Generate a collection and insert all provided data into it.",
  "Start a database service and add a batch of records to it.",
  "Open or start a database and populate it with structured data.",
  "Define a database and collection and insert a predefined data array.",
  "Set up a database environment and load data into its schema.",
  "Generate and populate a database with specified data entries.",
  "Create a database, assign a collection, and fill it with provided data.",
  "Insert an array of objects into a collection within a database.",
  "Start a database session and load the specified data into it.",
  "Generate a structured database and input the provided array.",
  "Form a database and populate it with a batch of documents.",
  "Set up a new database instance and bulk insert an input array.",
  "Define a database schema and add the input array to a collection.",
  "Build and populate a database with the given set of records.",
  "Generate a database with a collection and input all data provided.",
  "Initialize a database and insert structured data into its collection.",
  "Insert a batch of items into a defined database and collection.",
  "Build a new database and load the initial data into its collection.",
  "Create a database and populate its collection with structured records.",
  "Start a database, create a collection, and bulk insert data.",
  "Set up a collection and add all provided entries to a database.",
  "Generate a database and collection and populate it with input data.",
  "Create a new collection in a database and insert an array of items.",
  "Launch a database and populate it with a batch of structured entries.",
  "Form a database and load it with the given array of data records.",
  "Set up a database schema and populate it with an input data array.",
  "Create a database instance and bulk insert all provided documents.",
  "Define and create a database, then populate it with an array of data.",
  "Insert all provided entries into a collection of a defined database.",
  "Start a new database and immediately populate its collection with data.",
  "Generate a database, name a collection, and fill it with input records.",
  "Create a database and insert structured data into its default collection.",
  "Set up a database instance and load all provided entries into it.",
  "Open or start a database collection and populate it with records.",
  "Add all input documents into a defined database and its collection.",
  "Design a database structure and populate it with a provided dataset.",
  "Launch a new database and insert a batch of records into it.",
  "Initialize a database collection and bulk insert an input array.",
  "Generate a database and seed its collection with structured data.",
  "Build a database, add a collection, and fill it with documents.",
  "Create a new database and populate its initial collection with data.",
  "Define a database and load all provided data into its collection.",
  "Start a database and bulk insert an array of data into its collection.",
  "Add structured entries into a defined collection in a database.",
  "Form a database and immediately populate its collection with records.",
  "Create a database, name a collection, and load it with input entries.",
  "Launch a database session and fill its collection with the data array.",
  "Set up a database schema and bulk insert all provided entries.",
  "Insert documents into a defined collection in a new database.",
  "Generate a database, define a collection, and populate it with data.",
  "Start a database system and load it with an input batch of records.",
  "Insert a dataset into a collection within a defined database schema.",
  "Generate a database instance and bulk load all data into its schema.",
  "Form a database structure and insert an array of records into it.",
  "Initialize a database and populate its default collection with data.",
  "Open or start a database and bulk load an input dataset into it.",
  "Build a database environment and load it with a batch of data.",
  "Insert a list of objects into a collection of a database schema.",
  "Create and fill a database and its collection with input documents.",
  "Start a database schema and populate it with a batch of records.",
  "Launch a new database and load it with all provided records.",
  "Create a database and insert an array of data into its collection.",
  "Add a dataset to a new database and define its collection schema.",
  "Build and populate a database instance with all input documents.",
  "Set up a database framework and insert structured data into it.",
  "Insert bulk data into a newly created collection of a database.",
  "Define a database instance and populate it with input data arrays.",
  "Start a database environment and populate it with structured records.",
  "Insert input entries into a defined database and its primary collection.",
  "Generate a new database schema and populate it with provided data.",
  "Build and configure a database and load it with an array of objects.",
  "Insert provided records into a newly created database environment.",
  "Open or launch a database and load its collection with data entries.",
  "Define a database schema and bulk insert structured data into it.",
  "Create a database collection and populate it with the input dataset.",
  "Generate a new database environment and load its collection with data.",
  "Insert structured data into a new collection of a defined database.",
  "Create a database schema and load it with an input array of objects.",
  "Launch a database framework and populate its default collection.",
  "Define a database and bulk insert a set of records into its schema.",
  "Insert a structured dataset into a collection within a database schema.",
  "Build a database instance and fill its collection with input records.",
  "Generate a database, name a collection, and load it with an array.",
  "Start a database collection and populate it with an input dataset.",
  "Form a database and bulk load it with the provided array of entries.",
  "Insert structured records into a newly defined collection of a database.",
  "Create and populate a database and its schema with the input dataset.",
  "Add all provided records into a defined database and its collection.",
  "Define and create a database collection, then load it with documents.",
  "Start a database session and bulk insert data into its collection.",
  "Build a new database system and load all input documents into it."
];

async function createDb(nameOfDB, nameOfCollection, dataInArray) {
  try {
    // Connect to the database
    await client.connect();

    // Get database and collection references
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);

    // Insert the provided data
    await collection.insertMany(dataInArray);
    console.log("Data Inserted Successfully!");

    return true;
  } catch (err) {
    console.error("Error inserting data:", err);
    return false;
  } finally {
    // Ensure the client is closed after the operation
    await client.close();
  }
}

// Usage example
(async () => {
  const res = await createDb("jenil", "pamrar", [
    { name: "Hi", age: 14 },
    { name: "Hello", age: 18 },
    { name: "Hey", age: 20 },
  ]);
  console.log(res);
})();
