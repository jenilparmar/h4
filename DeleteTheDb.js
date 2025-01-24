const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const dis = [
  "Delete a database from the system.",
  "Remove an existing database completely.",
  "Erase all records and schema for a specific database.",
  "Drop a database by its name.",
  "Destroy the database identified by its name.",
  "Eliminate a database from MongoDB.",
  "Wipe a database off the server.",
  "Terminate a database instance.",
  "Execute deletion of a database.",
  "Clear all data and remove the database structure.",
  "Completely remove the specified database.",
  "Disconnect and delete a database from MongoDB.",
  "Dispose of a database entirely.",
  "Permanently delete a database and its contents.",
  "Delete the database to free up space.",
  "Initiate the removal of a database.",
  "Remove the specified database from the cluster.",
  "Drop an unwanted database.",
  "Clean up by deleting an unused database.",
  "Perform a database removal operation.",
  "Delete database records and metadata.",
  "Free the server by deleting the database.",
  "Execute the drop command for a database.",
  "Clear out a database permanently.",
  "Remove database configurations and data.",
  "Erase a database to start fresh.",
  "Drop the collection of data associated with a database.",
  "Issue a request to delete a database.",
  "Completely wipe the contents of a database.",
  "Remove a database that is no longer needed.",
  "Shut down and delete a database instance.",
  "Delete database files and references.",
  "Purge a database from the MongoDB environment.",
  "Erase a database's existence from the server.",
  "Perform a cleanup by deleting a database.",
  "Drop the database without leaving traces.",
  "Dismantle the database structure entirely.",
  "Remove a database that was created incorrectly.",
  "Eliminate a database used for testing purposes.",
  "Delete a database to recover system resources.",
  "Wipe out the database identified in the command.",
  "Remove a database for better system organization.",
  "Execute a full database deletion process.",
  "Drop a database and its associated metadata.",
  "Completely delete a database without recovery.",
  "Get rid of an unused database instance.",
  "Erase all collections in the specified database.",
  "Initiate a database deletion request.",
  "Delete a redundant database.",
  "Wipe a test database from the environment.",
  "Destroy a database to prevent misuse.",
  "Remove a database that is no longer relevant.",
  "Drop a database after ensuring no dependencies.",
  "Purge an unused database from MongoDB.",
  "Erase a database created by mistake.",
  "Clean up storage by deleting a database.",
  "Remove a development database after testing.",
  "Delete a backup database to free up space.",
  "Drop a database for maintenance purposes.",
  "Erase a temporary database created for testing.",
  "Execute a database removal command.",
  "Initiate deletion for an outdated database.",
  "Get rid of the database no longer in use.",
  "Completely erase a database and its data.",
  "Purge a database from the system resources.",
  "Drop a database that holds obsolete data.",
  "Eliminate a database to clear disk space.",
  "Perform a database removal for clean storage.",
  "Wipe out a database containing outdated records.",
  "Delete a sample database after testing.",
  "Get rid of an experimental database.",
  "Erase the contents of a specific database.",
  "Remove the database to reset the environment.",
  "Drop the old database for migration purposes.",
  "Eliminate a database to reorganize resources.",
  "Delete the database with all its collections.",
  "Clear the database structure permanently.",
  "Remove a temporary database used for demos.",
  "Execute the command to delete a database.",
  "Wipe the database for security purposes.",
  "Erase a database to comply with regulations.",
  "Delete an archived database for optimization.",
  "Drop an old database to free up capacity.",
  "Eliminate the database to prevent errors.",
  "Clean up the database environment.",
  "Perform a database drop for space management.",
  "Delete an extra database from the system.",
  "Remove an unused database to declutter.",
  "Clear out old databases from the server.",
  "Erase a database used during development.",
  "Delete the test database after validation.",
  "Destroy a database for proper housekeeping.",
  "Wipe out the unused database entry.",
  "Perform the database drop operation.",
  "Drop a legacy database for modernization.",
  "Remove the redundant database instance.",
  "Clean the system by deleting old databases.",
  "Execute a safe deletion of a database.",
  "Remove outdated database schemas.",
  "Drop a corrupted database to avoid issues.",
  "Purge a database to reset configurations.",
  "Erase an experimental database after testing.",
  "Get rid of the development database setup.",
  "Remove a duplicate database entry.",
  "Delete the temporary database for cleanup.",
  "Permanently eliminate a database and its data.",
  "Initiate a full database wipe.",
  "Execute the database deletion process.",
  "Remove unnecessary database structures.",
  "Drop the testing database after debugging.",
  "Clear out redundant databases from the cluster.",
  "Perform a clean removal of a database.",
  "Eliminate a database to maintain efficiency.",
  "Erase a database from the MongoDB instance.",
  "Delete the specified database from storage.",
  "Perform the operation to drop a database.",
  "Clean the database storage environment.",
  "Delete unused databases to optimize performance.",
  "Wipe out old databases for resource management.",
  "Remove databases no longer in operation.",
  "Clear the database server of unwanted instances.",
  "Drop the outdated database to update records.",
  "Eliminate databases created during experiments.",
  "Perform a complete database deletion task.",
  "Erase databases to ensure clean resources.",
  "Remove the database and free storage space.",
  "Delete an inactive database instance.",
  "Get rid of the database to prevent clutter.",
  "Clean the database list of unnecessary entries.",
  "Drop a database created for temporary purposes.",
  "Delete the sample database used for testing.",
  "Remove an inactive database from MongoDB.",
  "Clear out unused database entries.",
  "Destroy a database that is no longer required.",
  "Eliminate outdated or redundant databases.",
  "Remove test databases created for validation.",
  "Wipe out legacy databases from the system.",
  "Perform maintenance by dropping a database.",
  "Erase unwanted databases to optimize storage.",
  "Delete databases that are obsolete or unused.",
  "Clean the system by removing old database entries.",
  "Drop experimental databases after analysis.",
  "Purge temporary databases from the environment.",
  "Erase redundant databases to improve performance."
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

