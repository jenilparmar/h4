const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const disc = [
  "Connect to the MongoDB server to create a new database and insert data.",
  "Create a new database with the provided name if it doesn't already exist.",
  "Initialize a collection within the database to store the data.",
  "Insert an array of documents into the specified collection in the database.",
  "Log a success message when the data is successfully inserted into the collection.",
  "Handle any errors that might occur during the database or data insertion process.",
  "Return a success status when the data is inserted correctly, otherwise return a failure status.",
  "Ensure proper connection to the MongoDB server before attempting to insert data.",
  "Close the MongoDB client after the data insertion is complete to free up resources.",
  "Insert multiple documents into a MongoDB collection in a single operation using insertMany.",
  "Handle the process of connecting to the server, creating a database, and inserting data in sequence.",
  "Provide detailed error logging to help diagnose any issues during the data insertion process.",
  "Return a confirmation message indicating that the data was successfully added to the collection.",
  "Use asynchronous operations to efficiently create a database and insert data without blocking the event loop.",
  "Ensure that the MongoDB client connection is securely closed after completing the operation."
]

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
