const { Client } = require("pg");

async function CreateTable(nameOfDB, nameOfTable  ) {
  if (!nameOfDB || !nameOfTable) {
    console.log("Missing the name of the database or table!");
    return false;
  }

  const adminClient = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres", // Default database to manage databases
    password: "Jenil.p12",
    port: 5432,
  });

  try {
    // Connect to the default 'postgres' database
    await adminClient.connect();

    // Check if the database exists
    const checkDbQuery = `
      SELECT 1
      FROM pg_database
      WHERE datname = $1
    `;
    const dbRes = await adminClient.query(checkDbQuery, [nameOfDB]);

    if (dbRes.rows.length === 0) {
      // Create the database if it doesn't exist
      await adminClient.query(`CREATE DATABASE ${nameOfDB}`);
      console.log(`Database "${nameOfDB}" created successfully!`);
    } else {
      console.log(`Database "${nameOfDB}" already exists!`);
    }

    // Close admin client and connect to the newly created/existing database
    await adminClient.end();

    const dbClient = new Client({
      user: "postgres",
      host: "localhost",
      database: nameOfDB, // Switch to the target database
      password: "Jenil.p12",
      port: 5432,
    });

    // Connect to the target database
    await dbClient.connect();

    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${nameOfTable} (
        
      );
    `;
    await dbClient.query(createTableQuery);
    console.log(`Table "${nameOfTable}" created successfully in database "${nameOfDB}"!`);

    // Close the database connection
    await dbClient.end();

    return true;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}

(async () => {
  const res = await CreateTable("kunal", "students");
  console.log("Result:", res);
})();
