const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

const descriptions = [
  "Verify if a specific database exists in the system.",
  "Check the presence of a database by its name.",
  "Find out if a database has already been created.",
  "Determine whether a database exists.",
  "Search for a database in the list of existing ones.",
  "Look for a specific database in the database server.",
  "Query the server to confirm a database's existence.",
  "Ensure the database is already set up and available.",
  "Identify if a database has been initialized.",
  "Check whether the database is present on the server.",
  "Confirm the database has been previously created.",
  "Validate the existence of a database on the system.",
  "Scan for a database by its name in the database server.",
  "Check if a database is listed in the database catalog.",
  "Look for the presence of a database in the server's inventory.",
  "Verify whether a database is registered with the server.",
  "Test if a database with the given name exists.",
  "Check if the database name matches any existing databases.",
  "Determine if a database by this name is live.",
  "Confirm the presence of the desired database on the server.",
  "Search through the list of databases for a specific name.",
  "Ensure the specified database exists on the system.",
  "Locate a database by its name in the current setup.",
  "Check if the database name exists in the server's metadata.",
  "Verify the initialization of a database with the given name.",
  "Find a database matching the specified name in the server.",
  "Ensure that a database with this name has been set up.",
  "Confirm whether the requested database is in the system.",
  "Identify if the database is already created in the server.",
  "Verify the database name against existing entries.",
  "Check if a specific database entry exists.",
  "Look for an initialized database by its name.",
  "Ensure the server contains the requested database.",
  "Validate the existence of a named database on the server.",
  "Search for the requested database among existing ones.",
  "Check for the availability of a database in the catalog.",
  "Find if a database is active on the server.",
  "Confirm that the database setup includes the requested one.",
  "Query the database server for a specific database name.",
  "Verify the server's catalog for the given database name.",
  "Check for the specified database in the system.",
  "Determine the availability of the requested database.",
  "Ensure the database is registered in the server metadata.",
  "Check if the server has a database by this name.",
  "Search for the database name in the server's list.",
  "Ensure a database of the given name exists.",
  "Test the server's catalog for a matching database.",
  "Look up a database in the server's catalog.",
  "Confirm the existence of a named database in the setup.",
  "Locate the requested database in the database list.",
  "Find out if the database is already live on the server.",
  "Ensure that the database name exists on the server.",
  "Search for the presence of the named database.",
  "Check if the database is already set up.",
  "Ensure the server holds a database of this name.",
  "Identify if the database is listed in the system's catalog.",
  "Validate the presence of the database in the inventory.",
  "Look up the database in the server to confirm its existence.",
  "Ensure the given database is ready and available.",
  "Find out whether the database is listed on the system.",
  "Query the system for a database by name.",
  "Verify the inclusion of the database in the setup.",
  "Check the current server setup for the database name.",
  "Test the existence of the database in the inventory.",
  "Look through the system catalog for the requested database.",
  "Confirm if a database with this name exists in the server.",
  "Ensure that the server includes the requested database.",
  "Find out if the database name is registered in the system.",
  "Locate a specific database by its name in the server.",
  "Check the server's inventory for a database with this name.",
  "Search the database list for a matching entry.",
  "Confirm the presence of a database with the specified name.",
  "Identify if the named database is part of the server's catalog.",
  "Check if the requested database name exists on the server.",
  "Ensure the server recognizes the named database.",
  "Validate the existence of the named database in the server.",
  "Verify if the given database is active in the system.",
  "Search for a matching database name in the server's records.",
  "Ensure the database is properly initialized on the system.",
  "Look up the database name in the server's catalog.",
  "Confirm the availability of the requested database.",
  "Determine whether the requested database is registered.",
  "Search the system for a database with the given name.",
  "Check the current inventory for the named database.",
  "Locate the requested database in the server's setup.",
  "Ensure the database name is part of the server's list.",
  "Check for the specified database name in the catalog.",
  "Validate if the database exists on the database server.",
  "Look for the named database in the list of entries.",
  "Search for a database matching the given name.",
  "Confirm the registration of the requested database.",
  "Verify the server holds the specified database.",
  "Identify if the database is present on the system.",
  "Check for the initialization of the requested database.",
  "Ensure the database setup includes the requested name.",
  "Search for the named database in the system inventory.",
  "Test the server's inventory for the named database.",
  "Locate the database in the system by its name.",
  "Verify the server's setup for the requested database.",
  "Ensure the specified database is registered on the system.",
  "Look through the system catalog for the database name.",
  "Identify if the database is included in the server.",
  "Check the system for a database of the given name.",
  "Confirm if the requested database is listed in the system.",
  "Search for the presence of a database by name.",
  "Ensure the database is already created on the system.",
  "Locate the requested database in the system catalog.",
  "Verify the catalog for a matching database name.",
  "Search the system for the named database.",
  "Ensure the server setup includes the database.",
  "Check the system for the database registration.",
  "Identify if the named database is available.",
  "Look for a specific database by name.",
  "Verify the system holds the requested database.",
  "Search for the requested database by name.",
  "Ensure the database exists in the setup.",
  "Confirm the database is part of the inventory.",
  "Validate the server's database list for the name.",
  "Check for the presence of the requested database.",
  "Identify the requested database in the inventory.",
  "Ensure the requested database is part of the system."
];

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