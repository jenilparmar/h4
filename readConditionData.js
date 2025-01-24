const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const descriptions = [
  "Create a new database.",
  "Check the contents of an existing database.",
  "Query a database for specific information.",
  "Insert new data into the database.",
  "Update records within the database.",
  "Delete a record from the database.",
  "Fetch data from a specific database.",
  "Establish a new collection in the database.",
  "Modify entries in a collection.",
  "Retrieve data based on specific conditions.",
  "Create a collection with unique identifiers.",
  "Validate the schema of the database.",
  "Insert a new document into the collection.",
  "Update fields in a database record.",
  "Remove a document from the database.",
  "Find entries matching specified conditions.",
  "Count the number of documents in a collection.",
  "Create a new database with initial records.",
  "Verify the existence of a specific document.",
  "Sort data within the database based on criteria.",
  "Aggregate data from the database.",
  "Export database records to a file.",
  "Import data into a new collection.",
  "Add an index to a database collection.",
  "Drop a collection from the database.",
  "Backup the entire database.",
  "Restore the database from a backup.",
  "Check for duplicates within the collection.",
  "Generate a report based on database queries.",
  "Create a database and seed initial data.",
  "Create a new table within the database.",
  "Search for specific records in the database.",
  "Update multiple entries in the database.",
  "Create a relationship between tables in the database.",
  "Verify data integrity within the database.",
  "Analyze performance of the database queries.",
  "Get a list of all collections in a database.",
  "Create a schema for new data records.",
  "Define validation rules for the database.",
  "Check if a collection exists in the database.",
  "Insert bulk data into a collection.",
  "Check for the existence of a table in the database.",
  "Modify a document's structure in the collection.",
  "Retrieve a list of all documents in a collection.",
  "Create a unique index on a collection field.",
  "Sort records based on specific field values.",
  "Find records matching multiple conditions.",
  "Create a database with multiple collections.",
  "Run a query to fetch records from the database.",
  "Perform a join between two tables in a database.",
  "Check if a database is empty.",
  "Create a new record with automatic fields.",
  "Modify database schema to support new fields.",
  "Query records based on range conditions.",
  "Delete records older than a certain date.",
  "Archive data from a collection into another.",
  "Create a relational database with links between tables.",
  "Insert new records with a specified schema.",
  "Fetch the first N records from the collection.",
  "Update a specific field in all matching records.",
  "Generate statistics based on the data in the database.",
  "Select records where a field value is within a range.",
  "Define a foreign key relationship between tables.",
  "Select unique records from the database.",
  "List all indexes in a database collection.",
  "Insert data into a specific table with specified columns.",
  "Return records sorted in ascending order.",
  "Create a custom query for fetching database entries.",
  "Create a document with unique identifiers in the collection.",
  "Perform a complex query across multiple tables.",
  "Add a new entry into a database collection.",
  "List all available databases on the server.",
  "Insert a record based on conditional checks.",
  "Update the database schema to reflect changes.",
  "Count the number of records that match a filter.",
  "Add a new collection to an existing database.",
  "Run a filter on data based on specific conditions.",
  "Check for missing fields in the database records.",
  "Perform a quick lookup for a specific record.",
  "Create a schema for structured data entry.",
  "Query records with a field matching multiple values.",
  "Update the metadata associated with a database.",
  "Get the metadata for a particular collection.",
  "Delete a document from the collection based on ID.",
  "Check for consistency across related collections.",
  "Backup the data from a specific collection.",
  "Delete data from the database based on a condition.",
  "Modify database connection settings.",
  "Insert a new field into the database schema.",
  "Check if a record exists before updating.",
  "Verify if all records meet a specific condition.",
  "Perform a search query on a large dataset.",
  "Create a unique identifier for each new document.",
  "Check the database connection status.",
  "List the indexes available on a collection.",
  "Insert records with a predefined structure.",
  "Perform a query to find duplicate records.",
  "Generate a summary report from the database.",
  "Create a table with specific constraints.",
  "Insert data into multiple tables simultaneously.",
  "Check the size of a database collection.",
  "Remove a table from the database.",
  "Sort documents in descending order.",
  "Export a collection's data to a CSV file.",
  "Retrieve the last inserted record from the collection.",
  "Test the performance of database queries.",
  "Remove all records from a collection.",
  "Alter the structure of an existing collection.",
  "Backup the collection and its associated data.",
  "Create a timestamp field in the database schema.",
  "Perform conditional inserts based on data state.",
  "Run a query to find the most recent records.",
  "Check if a field exists in the database schema.",
  "Define conditions for selecting specific rows.",
  "Add a custom rule for data validation in the database.",
  "Modify data based on multiple conditions.",
  "Delete all records older than a certain threshold.",
  "Create and manage multiple databases.",
  "Run an aggregation query to summarize data.",
  "Track changes made to the database entries.",
  "Create a read-only version of the database.",
  "Create an automated task to update the database.",
  "Test different query performance in the database.",
  "Check the current data size of a database.",
  "Select records matching a specific range of values.",
  "Query the database and group results by a field.",
  "Find records within a certain geographical range.",
  "Create a foreign key constraint on a collection.",
  "Insert new data with a multi-step process.",
  "Add fields to an existing record in the collection.",
  "Perform data transformations during a query.",
  "Define an index on a specific field for faster lookups.",
  "Merge multiple collections into one.",
  "Create a timestamp for each inserted record.",
  "Select documents based on a combination of filters.",
  "Update multiple fields in one query.",
  "Backup the database and all its collections.",
  "Add an auto-incrementing primary key to a collection.",
  "Perform a database health check.",
  "Run a query to retrieve documents by ID.",
  "Sort records in a collection by multiple fields.",
  "Export query results into a text file.",
  "Add custom constraints to a collection schema.",
  "Modify a collection's name within the database.",
  "Check the index structure of the database.",
  "Count how many records match the search criteria.",
  "Create a backup schedule for the database.",
  "Optimize database queries for better performance.",
  "Generate a full report of database activity.",
  "Create a new database from an existing template.",
  "Create multiple indexes for efficient queries.",
  "Insert batch records into the database.",
  "Delete records older than a specified time frame.",
  "Select the top N records based on specific criteria.",
  "Create a new field for each record in a collection."
];

async function readConditionData(nameOfDB, nameOfCollection, atrs) {
  try {

    await client.connect();

    
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);


    const res = await collection.find({}).toArray();

    const uniqueResults = new Set();

    const response = res.filter((doc) => {
      const matches = atrs.every(({ field, operator, value }) => {
        if (Array.isArray(value)) {
   
          if (operator === "==") {
            return value.includes(doc[field]);
          } else if (operator === "!=") {
            return !value.includes(doc[field]);
          } else {
            throw new Error(`Unsupported operator for array: ${operator}`);
          }
        } else {
          // Handle regular single-value conditions
          switch (operator) {
            case "<":
              return doc[field] < value;
            case "<=":
              return doc[field] <= value;
            case ">":
              return doc[field] > value;
            case ">=":
              return doc[field] >= value;
            case "==":
              return doc[field] == value;
            case "!=":
              return doc[field] != value;
            default:
              throw new Error(`Unsupported operator: ${operator}`);
          }
        }
      });

      // If the document matches, add it to the Set
      if (matches) {
        uniqueResults.add(JSON.stringify(doc)); // Serialize document to avoid object reference issues
      }

      return matches;
    });

    // Convert the Set back to an array and return unique results
    return Array.from(uniqueResults).map((doc) => JSON.parse(doc));
  } catch (err) {
    console.error("Error filtering data:", err);
    return [];
  } finally {
    // Ensure the client is closed after the operation
    await client.close();
  }
}

// Usage example
(async () => {
  
  const filters = [
    { field: "accountName ", operator: "==", value: "exampleEmail@gmail.com" },
  ];

  const res = await readConditionData("SocailMedia", "posts", filters);
  console.log(res);
})();
module.exports = readConditionData;
