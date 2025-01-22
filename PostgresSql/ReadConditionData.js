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

    // Construct SQL query
    const query = `SELECT * FROM ${nameOfTable} WHERE ${conditions}`;

    const res = await client.query(query);

    // Return the results
    return res.rows;
  } catch (err) {
    console.error("Error filtering data:", err);
    return [];
  } finally {
    // Ensure the client is closed after the operation
    await client.end();
  }
}

// Usage example
(async () => {
  // Define filtering criteria
  const filters = [
    { field: "accountName", operator: "==", value: "exampleEmail@gmail.com" },
    { field: "postDate", operator: ">", value: "2023-01-01" },
  ];

  const res = await readConditionDataPostgres("SocialMedia", "posts", filters);
  console.log(res);
})();
