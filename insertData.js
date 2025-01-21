const {MongoClient} = require("mongodb")
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri)

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
