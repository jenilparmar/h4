const { Client } = require("pg");

async function readAllData(nameOfDB, nameOfTable) {
  if (!nameOfDB || !nameOfTable) {
    console.error("Missing database name or table name!");
    return [];
  }

  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: nameOfDB,
    password: "Jenil.p12",
    port: 5432,
  });

  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to Database: " + nameOfDB);

    // Perform the query
    const res = await client.query(`SELECT * FROM ${nameOfTable}`);
    // console.log("Query result:", res.rows);

    return res.rows; // Return the query result rows
  } catch (err) {
    console.error("Error during query execution:", err.message);
    return []; // Return an empty array in case of error
  } finally {
    // Always close the connection
    await client.end();
    console.log("Disconnected from the database.");
  }
}

// Example usage
(async () => {
  const res = await readAllData("college", "dynamic_table"); // Replace "dynamic_table" with your table name
  console.log("Final result:", res);
})();
