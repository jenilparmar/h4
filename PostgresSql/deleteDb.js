const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres", // Connect to the default "postgres" database
  password: "Jenil.p12",
  port: 5432,
});

async function deleteDb(nameOfDB) {
  if (!nameOfDB) {
    console.error("Missing the name of the database!");
    return false;
  }

  try {
    await client.connect();
    console.log("Connected to the PostgreSQL server.");

    // Correcting the typo in the query
    const query = `DROP DATABASE ${nameOfDB} WITH (FORCE)`;
    await client.query(query);
    console.log(`Database '${nameOfDB}' deleted successfully.`);
    return true;
  } catch (err) {
    console.error("Error deleting the database:", err.message);
    return false;
  } finally {
    await client.end();
    console.log("Disconnected from the PostgreSQL server.");
  }
}

// Example usage
(async () => {
  const isDeleted = await deleteDb("kunal");
  console.log("Operation result:", isDeleted);
})();
