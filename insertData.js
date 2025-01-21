const {MongoClient} = require("mongodb")
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri)
const disc = [
    "Connect to MongoDB to insert data into the specified collection within a database.",
    "Ensure that the provided data is an array before proceeding with the insertion.",
    "Log an error and return false if the data is not an array, preventing invalid input.",
    "Check if both the database name and collection name are provided before attempting the operation.",
    "Log an error if the database or collection names are missing or incorrect.",
    "Use the `insertMany` method to insert multiple documents into the specified MongoDB collection.",
    "Validate the input data and parameters to ensure proper insertion into the collection.",
    "Capture any errors during the insertion process and provide detailed logs for debugging.",
    "Ensure proper error handling when the insertion operation fails, such as invalid data formats or connection issues.",
    "Return a boolean indicating the success or failure of the data insertion process.",
    "Handle database connection and insertion asynchronously to avoid blocking the main thread.",
    "Return true upon successful insertion of the data into the MongoDB collection.",
    "Provide feedback when an error occurs during data insertion, such as incorrect collection names or data formats.",
    "Ensure that the MongoDB client is properly connected and closed after completing the operation.",
    "Return an error message if invalid data types or missing parameters are detected, improving error clarity."
  ]
  
async function insertData(nameOfDB , nameOfColletion , data) {
    if(!Array.isArray(data)) {
        console.error("Kindly Add Array in Data nothing other then that !!");
        
        return false;
    }
    if(!nameOfColletion || !nameOfDB){
        console.error("Please Enter the Name of Database or Collection Correctly!!");
        return false;
    }
    try{
        await client.connect();
        const db = client.db(nameOfDB);
        const col = db.collection(nameOfColletion);
        const res = col.insertMany(data);
        
        return true;
    }
    catch (err){
        console.log(err);
        return false;
        
    }
}
