const {MongoClient} = require("mongodb")
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri)

  const disc =[
    "Insert data into the specified collection of the database.",
    "Add records to a collection in a database.",
    "Populate a database collection with an array of data.",
    "Save multiple documents to a collection in the database.",
    "Batch insert an array of objects into the database collection.",
    "Store an array of data into the specified database and collection.",
    "Create a new collection in the database and insert data.",
    "Upload records into the designated collection of the database.",
    "Insert multiple entries into a database collection.",
    "Insert a set of documents into a specified collection.",
    "Write data into a database's specific collection.",
    "Add a bulk of data to the target database collection.",
    "Push data into a MongoDB collection.",
    "Add an array of documents to a given collection.",
    "Insert a batch of data records into a database.",
    "Save multiple entries into the specified database.",
    "Bulk upload records into a MongoDB database.",
    "Store an array of JSON objects in the database.",
    "Create entries in the specified database collection.",
    "Write multiple rows of data into the database.",
    "Add an array of documents into the database system.",
    "Save records into a MongoDB database collection.",
    "Insert batch data into the given collection of a database.",
    "Upload bulk entries into the desired database collection.",
    "Store data into the specified collection in the MongoDB instance.",
    "Send an array of items to be stored in the database collection.",
    "Add multiple objects to a specific database table.",
    "Create new documents in the MongoDB database.",
    "Upload bulk data into a collection within the database.",
    "Batch insert multiple items into the MongoDB collection.",
    "Save an array of records to the specified database.",
    "Add new entries to a collection in a MongoDB instance.",
    "Push a group of documents to the database's collection.",
    "Insert multiple rows of JSON data into the database.",
    "Store an array of new data into the target database.",
    "Insert multiple records into a MongoDB collection.",
    "Save an array of values into the specified database table.",
    "Add a batch of documents to the given MongoDB database.",
    "Create and populate a database collection with data.",
    "Upload an array of information into the database system.",
    "Send multiple records to a specific MongoDB collection.",
    "Push bulk data into the given database collection.",
    "Save multiple JSON objects in a MongoDB database.",
    "Insert several documents into the database table.",
    "Batch store records into a MongoDB collection.",
    "Write an array of JSON data to the database.",
    "Create entries and store them in the collection.",
    "Insert records into a specific MongoDB database collection.",
    "Add data to a specific MongoDB collection in bulk.",
    "Insert a set of entries into the specified database.",
    "Upload multiple documents to a MongoDB table.",
    "Save new data to the designated database collection.",
    "Push a batch of items to the database system.",
    "Store a group of JSON objects in the database.",
    "Insert data entries into a MongoDB table in bulk.",
    "Create new records and save them in the database.",
    "Populate a MongoDB table with an array of items.",
    "Add multiple data entries to a database collection.",
    "Insert an array of information into the target collection.",
    "Send data to be added into a specific database table.",
    "Save bulk JSON objects into the designated collection.",
    "Upload a group of documents to the database.",
    "Insert new rows of data into the specified collection.",
    "Push a list of records to the database system.",
    "Add data to the MongoDB database in bulk.",
    "Save multiple JSON records into a database table.",
    "Insert a batch of new documents into the collection.",
    "Populate a database with an array of new records.",
    "Upload a set of JSON data into a MongoDB instance.",
    "Create new entries in a MongoDB database table.",
    "Write bulk data to the specified collection of the database.",
    "Insert new information into a specific MongoDB table.",
    "Add a set of documents to the database collection.",
    "Save multiple rows of records to the specified database.",
    "Upload an array of documents into a MongoDB collection.",
    "Store batch data into the designated collection in the database.",
    "Push bulk JSON objects into a database collection.",
    "Send data entries to the specified MongoDB table.",
    "Write multiple JSON records to the database collection.",
    "Insert bulk records into the database and collection.",
    "Upload multiple entries into a MongoDB database table.",
    "Populate a database table with an array of new entries.",
    "Add a group of records to the collection in the database.",
    "Save an array of items into the MongoDB instance.",
    "Insert batch JSON objects into the specified table.",
    "Store bulk data into the collection within the database.",
    "Add an array of rows to the MongoDB database.",
    "Push bulk records into the designated database collection.",
    "Upload an array of values into a database collection.",
    "Write batch documents to a MongoDB collection.",
    "Insert JSON data into the specified database collection.",
    "Create records and insert them into a collection.",
    "Save a list of JSON documents into the MongoDB table.",
    "Add a bulk of new items to a database collection.",
    "Upload new data into a MongoDB instance's collection.",
    "Send an array of JSON values into the database.",
    "Store an array of entries into a MongoDB collection.",
    "Insert a list of rows into the given database table.",
    "Populate the MongoDB database collection with new data.",
    "Push an array of records to the database instance.",
    "Save batch JSON entries to the specified database.",
    "Insert multiple data records into the MongoDB system.",
    "Add bulk JSON objects into the desired collection.",
    "Store a group of new documents in a MongoDB collection.",
    "Upload multiple items into the database's table.",
    "Send a list of JSON data to be stored in the database.",
    "Write an array of objects into the specified collection.",
    "Insert data in bulk to the specified MongoDB database.",
    "Save multiple items to a MongoDB collection.",
    "Add new rows of data into the database collection.",
    "Push JSON records to the given MongoDB table.",
    "Upload a list of entries to the MongoDB system.",
    "Insert batch data into a specific database table.",
    "Populate the collection with an array of new JSON objects.",
    "Add multiple records into the database in one operation.",
    "Save new data entries into a MongoDB database table.",
    "Send bulk data to the specified MongoDB collection.",
    "Store an array of JSON values into a database table.",
    "Insert multiple documents into the designated collection.",
    "Upload bulk JSON objects to the MongoDB database.",
    "Push new entries into the specific database collection.",
    "Save a batch of new JSON records in a database.",
    "Write multiple rows into a MongoDB database table.",
    "Add an array of new records to the collection.",
    "Populate the MongoDB collection with an array of records.",
    "Upload a set of data entries to a MongoDB collection.",
    "Insert bulk JSON data into a specified database table.",
    "Send multiple entries into the target database collection.",
    "Save batch rows of information into the collection.",
    "Insert multiple JSON rows into the MongoDB database.",
    "Upload a group of data records to the collection.",
    "Push batch data rows into the database table."
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
