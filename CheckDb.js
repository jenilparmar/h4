const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);
const disc = [
  "Verify if a specified database is available in the MongoDB server.",
  "Determine the presence of a particular database by querying the list of databases.",
  "Check the status of the database and return a boolean indicating its existence.",
  "Use MongoDB's admin interface to list all available databases and confirm the requested one.",
  "Log the result of the database check, specifying whether the database exists or not.",
  "Handle any potential errors or exceptions that arise during the database connection and check.",
  "Ensure that the MongoDB client closes gracefully after checking the database's existence.",
  "Search the server’s database list to see if the database of interest is currently available.",
  "Perform an asynchronous check to find out if the target database exists within the MongoDB system.",
  "Query MongoDB for the list of databases, comparing it against the requested database name.",
  "Return a status message indicating whether the desired database exists or is absent.",
  "Automatically disconnect the MongoDB client after the operation to free up resources.",
  "Optimize the connection by using the MongoDB admin interface to get database details efficiently.",
  "Error-proof the operation by adding proper try-catch handling for failed database checks.",
  "Create a reusable function to check the existence of any database, simplifying future operations."
]


async function checkDb(nameOfDB) {
  try {
    // Connect the client to the server
    await client.connect();

    // List all databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();

    // Check if the database exists in the list
    const dbExists = dbs.databases.some((db) => db.name === nameOfDB);

    if (dbExists) {
      console.log("Db Exists");
      return true;
    } else {
      console.log("No Db Exists");
      return false;
    }
  } catch (err) {
    console.error("Error occurred:", err);
    return false;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

(async () => {
  const res = await checkDb("Scrapped");
  console.log(res);
})();



module.exports = checkDb;