const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres", // Connect to the default 'postgres' database
  password: "Jenil.p12",
  port: 5432,
});

async function CreateDb(nameOfDB) {
  if (!nameOfDB) {
    console.log("Missing the name of the database!");
    return false;
  }

  try {
    // Connect to the default database
    await client.connect();

    // Check if the database already exists
    const checkDbQuery = `
      SELECT 1 
      FROM pg_database 
      WHERE datname = $1
    `;
    const res = await client.query(checkDbQuery, [nameOfDB]);

    if (res.rows.length > 0) {
      console.log(`Database "${nameOfDB}" already exists!`);
      return false;
    }

    // If the database doesn't exist, create it
    await client.query(`CREATE IF NOT EXISTS DATABASE ${nameOfDB}`);
    console.log(`Database "${nameOfDB}" created successfully!`);
    return true;
  } catch (err) {
    console.error("Error creating the database:", err);
    return false;
  } finally {
    // Close the connection
    await client.end();
  }
}

(async () => {
  const res = await CreateDb("kunal");
  console.log("Result:", res);
})();
