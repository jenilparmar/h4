const { Client } = require("pg");


async function createTableAndInsertData(nameOfDb,nameOfTable, data) {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: nameOfDb,
      password: "Jenil.p12",
      port: 5432,
    });
  try {
    await client.connect();
    console.log("Connected to the database.");

    // Extract columns from data (keys from the first object in the array)
    const columns = Object.keys(data[0])
      .map((key) => `"${key}" TEXT`)
      .join(", ");

    
    const createTableQuery = `CREATE TABLE IF NOT EXISTS "${nameOfTable}" (${columns})`;
    await client.query(createTableQuery);
    console.log(`Table '${nameOfTable}' created successfully.`);

    // Insert data into the table
    for (const row of data) {
      const keys = Object.keys(row).map((key) => `"${key}"`).join(", ");
      const values = Object.values(row)
        .map((value) => `'${value}'`)
        .join(", ");
      const insertQuery = `INSERT INTO "${nameOfTable}" (${keys}) VALUES (${values})`;
      await client.query(insertQuery);
    }
    console.log("Data inserted successfully.");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.end();
    console.log("Disconnected from the database.");
  }
}

// Example usage
(async () => {
  const nameOfTable = "dynamic_table";
  const data = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "San Francisco" },
  ];
  await createTableAndInsertData("college",nameOfTable, data);
})();
