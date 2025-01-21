const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

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
