const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const disc = [
  "Connect to MongoDB server to perform a collection deletion operation in the specified database.",
  "Check if the database and collection names are provided before attempting the operation.",
  "Ensure that the collection exists within the database before attempting to delete it.",
  "Retrieve the list of collections from the database and verify if the specified collection exists.",
  "If the collection does not exist, log an error message and terminate the operation.",
  "Drop the collection from the database if it exists, permanently removing its data.",
  "Log a success message once the collection is deleted successfully from the database.",
  "Handle errors related to database connection, collection deletion, or invalid inputs with detailed logs.",
  "Ensure the client connection is closed after the operation, regardless of success or failure.",
  "Perform a safe check before deleting, ensuring that required parameters (database and collection names) are not empty.",
  "Capture and log error messages and stack traces for easier debugging during the collection deletion process.",
  "Handle scenarios where the specified collection does not exist by checking the collection list and returning a descriptive error.",
  "Return a boolean value indicating the success or failure of the collection deletion operation.",
  "Ensure proper exception handling around MongoDB operations to safeguard against potential failures during deletion.",
  "Confirm the deletion of the collection by logging appropriate messages for both successful and failed operations."
]

async function DeleteCollection(nameOfDB, nameOfCollection) {
  if (!nameOfDB || !nameOfCollection) {
    console.log("Error: Database name or collection name cannot be empty.");
    return false;
  }

  try {
  
    await client.connect();

    // Access the specified database
    const db = client.db(nameOfDB);

    // Check if the collection exists
    const collections = await db.listCollections({ name: nameOfCollection }).toArray();
    if (collections.length === 0) {
      console.log(`Error: Collection "${nameOfCollection}" does not exist in database "${nameOfDB}".`);
      return false;
    }

    await db.dropCollection(nameOfCollection);
    console.log(`${nameOfCollection} deleted successfully.`);
    return true;

  } catch (err) {
   
    console.error("Error while deleting the collection:");
    console.error(`Message: ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    return false;

  } finally {
    // Ensure the client closes even if an error occurs
    console.log("Closing MongoDB connection...");
    await client.close();
  }
}

// Testing the function
(async () => {
  let result = await DeleteCollection("SocialMedia", ""); // Empty collection name for testing
  console.log("Operation result:", result);
})();
