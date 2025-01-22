const { Client } = require('pg');

async function readConditionDataPostgres(nameOfDB, nameOfTable, atrs) {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: nameOfDB,
    password: "Jenil.p12",
    port: 5432,
  });

  try {
    await client.connect();

    // Build the WHERE clause based on the filter criteria
    const conditions = atrs.map(({ field, operator, value }) => {
      if (Array.isArray(value)) {
        // Handling array-based conditions (e.g., value IN [...])
        if (operator === "==") {
          return `${field} IN (${value.map(v => `'${v}'`).join(", ")})`;
        } else if (operator === "!=") {
          return `${field} NOT IN (${value.map(v => `'${v}'`).join(", ")})`;
        } else {
          throw new Error(`Unsupported operator for array: ${operator}`);
        }
      } else {
        // Handling single-value conditions (e.g., field = value, field < value)
        switch (operator) {
          case "<":
            return `${field} < ${value}`;
          case "<=":
            return `${field} <= ${value}`;
          case ">":
            return `${field} > ${value}`;
          case ">=":
            return `${field} >= ${value}`;
          case "==":
            return `${field} = '${value}'`;
          case "!=":
            return `${field} != '${value}'`;
          default:
            throw new Error(`Unsupported operator: ${operator}`);
        }
      }
    }).join(" AND ");

    // Construct SQL query to fetch matching data
    const query = `SELECT * FROM ${nameOfTable} WHERE ${conditions}`;

    const res = await client.query(query);
    return res.rows; // Return matched rows

  } catch (err) {
    console.error("Error filtering data:", err);
    return [];
  } finally {
    await client.end(); // Ensure the client is closed after the operation
  }
}

async function updateDataPostgres(nameOfDB, nameOfTable, atrs, changeAtrs) {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: nameOfDB,
    password: "Jenil.p12",
    port: 5432,
  });

  try {
    await client.connect();

    // Get data to update based on conditions
    const dataToUpdate = await readConditionDataPostgres(nameOfDB, nameOfTable, atrs);
    const response = [];

    // Iterate over the filtered data and update the records
    for (const data of dataToUpdate) {
      // Assuming the data contains an id field that uniquely identifies each record
      const filter = { id: data.id }; // Replace `id` with your actual primary key field if different

      // Prepare the update statement
      const update = `UPDATE ${nameOfTable} SET ${changeAtrs.field} = '${changeAtrs.value}' WHERE id = ${data.id}`;

      // Execute the update
      const result = await client.query(update);
      response.push(result);
    }

    // Return the results of the update operation
    return `${response.length} rows updated!`;

  } catch (err) {
    console.error("Error updating data:", err);
    return [];
  } finally {
    await client.end(); // Ensure the client is closed after the operation
  }
}

// Usage Example
(async () => {
  const atrs = [
    { field: "age", operator: "<", value: 100 }
  ];

  const changeAtrs = {
    field: "name",
    value: "hogaya"
  };

  const results = await updateDataPostgres("jenil", "pamrar", atrs, changeAtrs);
  console.log(results); // Logs the results of the update operations
})();
