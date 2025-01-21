const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const disc = [
  "Connect to MongoDB to fetch all documents from the specified collection in the database.",
  "Ensure that both the database name and collection name are provided before querying data.",
  "Use the `find` method to retrieve all documents from the specified MongoDB collection.",
  "Convert the query result into an array using `toArray()` to handle and process the data more easily.",
  "Log a success message indicating that data has been successfully retrieved from the collection.",
  "Handle any errors during the data retrieval process and log them for better understanding and troubleshooting.",
  "Return an empty object inside an array as a fallback when the query fails or no data is found.",
  "Ensure the MongoDB client is properly closed after the operation to free resources and avoid memory leaks.",
  "Return the retrieved data as an array of documents, or an empty object if an error occurs.",
  "Capture and log errors related to database connection issues, collection access problems, or invalid query operations.",
  "Provide feedback on whether the data retrieval was successful or if any issues were encountered during the process.",
  "Asynchronously connect to MongoDB and query the collection to avoid blocking the execution of other tasks.",
  "Ensure robust error handling by providing an empty object as a fallback for failed data retrieval, ensuring consistent output format.",
  "Return the data in its entirety from the collection, with each document represented as an object within an array.",
  "Prevent resource leaks by properly closing the MongoDB connection after the data retrieval operation is completed."
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
