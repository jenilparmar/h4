const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const dis = [
  "Read all data from a collection in the database.",
  "Fetch all records from the specified collection in a database.",
  "Retrieve all documents from a collection within a given database.",
  "Access and return all entries from a database collection.",
  "Query the database to list all items in a collection.",
  "Get all data from a collection in the provided database.",
  "Extract all documents from the specified database collection.",
  "Retrieve the entire dataset from a collection in a database.",
  "List all documents stored in the collection of a database.",
  "Fetch every record from the mentioned database collection.",
  "Get the contents of a specific collection in the database.",
  "Pull all available data from the designated collection.",
  "Read and return all records from a given database collection.",
  "Retrieve every entry from a collection within the database.",
  "Access the complete list of documents in the chosen collection.",
  "Get all items from the database's specified collection.",
  "Query and return all records in the target database collection.",
  "Fetch the full set of documents from a specific collection.",
  "Retrieve data from all rows in a database collection.",
  "Extract every piece of data from the selected collection.",
  "Get a collection's contents from a connected database.",
  "Access the entire dataset stored in the provided collection.",
  "Query the database to fetch all collection documents.",
  "Retrieve and display all entries in the database collection.",
  "Fetch all items in a MongoDB collection.",
  "Return every record present in the collection of a database.",
  "Get all rows of data from a chosen collection.",
  "Access all records stored in the specific database collection.",
  "Read the entire collection data from a MongoDB database.",
  "Query for all documents within the named collection.",
  "Retrieve all rows of information from a database's collection.",
  "Extract every stored document in the collection provided.",
  "Fetch the complete list of entries from the collection.",
  "Access and retrieve all items within the target collection.",
  "Pull every record from the database collection for analysis.",
  "Get every document in a MongoDB collection with a function.",
  "Query the provided collection and return its entire contents.",
  "Extract all stored documents in a particular database collection.",
  "Fetch all database rows from the collection.",
  "Access all collection records and return them as an array.",
  "Get the entire dataset within the specified collection of a database.",
  "Return all stored records from the MongoDB collection.",
  "List every stored entry in a collection.",
  "Extract all existing documents within the given collection.",
  "Fetch every row from the collection and output as JSON.",
  "Pull all data records from the mentioned database and collection.",
  "Get all stored data entries from the connected MongoDB collection.",
  "Query and list all rows from a database collection.",
  "Retrieve full contents of the collection in the database.",
  "Read all collection data and display it as an output.",
  "Return every stored record in the designated MongoDB collection.",
  "Fetch the full dataset of the provided collection.",
  "Query the collection for all records stored in the database.",
  "Extract the entire list of items in the database collection.",
  "Get every record available in the specified collection.",
  "Access all data rows and return an array of documents.",
  "Retrieve and display every stored document from the collection.",
  "Fetch all records and log them to the console.",
  "Return an array of all collection entries in a MongoDB database.",
  "Access the database to fetch and list all collection items.",
  "Extract data from all rows in a MongoDB collection.",
  "Query all documents in the collection and output results.",
  "Return all available records from the chosen database collection.",
  "Access the database and return every document from the collection.",
  "Read the entire list of items within a specific collection.",
  "Fetch all documents stored in the named MongoDB collection.",
  "Retrieve the full list of entries in the provided database.",
  "Get the entire data stored in the collection of the database.",
  "Return the entire document list from a specified MongoDB collection.",
  "Retrieve every record stored within the collection.",
  "Query a MongoDB collection to extract all rows.",
  "List all available records in the connected database collection.",
  "Fetch every row in the selected MongoDB database collection.",
  "Extract the entire data array from the collection specified.",
  "Retrieve all collection entries from a MongoDB database.",
  "Query all rows of data stored in the chosen collection.",
  "Get every document saved in the collection of the database.",
  "Fetch all stored items in the MongoDB collection connected.",
  "Access and output the full list of collection records.",
  "Query and retrieve all database documents within a collection.",
  "Return the array of all documents from the collection.",
  "Fetch all entries in the specified MongoDB database collection.",
  "Retrieve all database records and return them as JSON.",
  "Get all rows in the MongoDB collection for processing.",
  "Access the collection to return every stored document.",
  "Retrieve and return all entries from the MongoDB database.",
  "Read the entire dataset stored in the selected collection.",
  "Fetch every row of data from the connected MongoDB collection.",
  "Get all collection documents in a MongoDB database.",
  "Return all stored data entries as an array of documents.",
  "Retrieve all items in the MongoDB database collection.",
  "Query for every entry stored in a MongoDB collection.",
  "Access and return all rows of data from a MongoDB collection.",
  "Fetch the full collection data from the database.",
  "List every document in a MongoDB collection.",
  "Extract all rows stored in the provided database collection.",
  "Return an array containing all records in a database collection.",
  "Access all entries in the MongoDB database's specified collection.",
  "Retrieve all MongoDB documents within the given collection.",
  "Get every data entry stored in the collection.",
  "Read the entire collection contents in a database.",
  "Fetch all rows of data from the selected collection.",
  "Extract every document available in the MongoDB database.",
  "Return a list of all collection entries from a database.",
  "Query all rows from a MongoDB collection.",
  "Get the entire document array in a database collection.",
  "Retrieve every document stored in the database's collection.",
  "Fetch the list of all stored data items in a collection.",
  "Read every record in a MongoDB collection and display them.",
  "Query the collection to extract all available data entries.",
  "List every row of information within the collection.",
  "Fetch all stored documents in the MongoDB database's collection.",
  "Extract the array of all rows from the collection.",
  "Access all collection data entries and return them as JSON.",
  "Retrieve every MongoDB document from the selected database collection.",
  "Get the full collection data stored in the MongoDB database.",
  "Query all available records in a database collection.",
  "Fetch every document stored in the specified database collection.",
  "Retrieve the entire document list from the target collection.",
  "Access all entries stored in a MongoDB database collection.",
  "Get all rows of data from the MongoDB database's collection.",
  "Fetch the array of all stored collection entries.",
  "Query the specified MongoDB collection for all rows.",
  "Return all documents stored in the collection as JSON.",
  "Extract every stored entry in the connected database collection.",
  "Fetch all rows of information from the selected MongoDB database.",
  "Access all stored documents in the collection of the database.",
  "Retrieve the full list of records stored in the collection.",
  "Query every row stored in a MongoDB collection and return data.",
  "Fetch the contents of a specific MongoDB collection.",
  "Extract all documents from a MongoDB database's collection."
]

async function readAllData(nameOfDB, nameOfCollection) {
  try {
    // Connect to the database
    await client.connect();

    // Get database and collection references
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);

    // Insert the provided data
    const res = await collection.find({}).toArray();
    console.log("Data Inserted Successfully!");

    return res;
  } catch (err) {
    console.error("Error inserting data:", err);
    return [{}];                           
  } finally {
    // Ensure the client is closed after the operation
    await client.close();                             
  }
}

// Usage example
(async () => {
  const res = await readAllData("SocailMedia", "posts");
  console.log(res);
})();
