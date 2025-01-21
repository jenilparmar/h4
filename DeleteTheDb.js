const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const disc = [
  "Connect to MongoDB to perform a database deletion operation.",
  "Verify that the database name is provided before proceeding with the deletion.",
  "Log the connection process and ensure that the specified database is ready for deletion.",
  "Use the `dropDatabase` method to permanently delete the specified database from MongoDB.",
  "Handle errors during the database deletion process and provide detailed error logs for troubleshooting.",
  "Ensure the client connection to MongoDB is closed after the deletion operation to avoid resource leaks.",
  "Return a boolean value indicating whether the database deletion was successful or failed.",
  "Log an error if the database name is missing or empty, preventing the operation from proceeding.",
  "Capture and log the error message and stack trace if an exception occurs during the operation.",
  "Notify the user of the successful deletion of the specified database with a confirmation message.",
  "Ensure the operation handles any exceptions related to database connectivity or deletion properly.",
  "Safeguard the operation by performing pre-validation checks, like ensuring the database name is non-empty.",
  "Log the entire operation process for better visibility and transparency when deleting a database.",
  "Delete the database from MongoDB, removing all associated collections and data within it.",
  "Return a success message upon successful deletion, and handle the case where the database might not exist."
]

async function DeleteDb(nameOfDB) {
  if (!nameOfDB) {
    console.log("Error: Database name cannot be empty.");
    return false;
  }

  try {
    console.log(`Connecting to MongoDB to delete database: ${nameOfDB}...`);
    await client.connect();

    const connect = client.db(nameOfDB);

    await connect.dropDatabase();
    console.log(`Database "${nameOfDB}" deleted successfully.`);
    return true;

  } catch (err) {
    console.error("Error while deleting the database:");
    console.error(`Message: ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    return false;

  } finally {
    console.log("Closing MongoDB connection...");
    await client.close();
  }
}


(async () => {
  let res = await DeleteDb("myDatabase"); 
  console.log("Operation result:", res);
})();
