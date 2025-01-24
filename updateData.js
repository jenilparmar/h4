const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const dis = [
  "Create a new database.",
  "Set up a database instance.",
  "Create a fresh database.",
  "Initialize a new database.",
  "Establish a database with a custom name.",
  "Create a database to store information.",
  "Start a new database for storing data.",
  "Set up a database and name it.",
  "Create a unique database.",
  "Create a new instance of the database.",
  "Generate a new database with a given name.",
  "Create a blank database for use.",
  "Open a new database.",
  "Initiate a database with a specific name.",
  "Create a database with custom attributes.",
  "Establish a fresh database.",
  "Initialize a blank database.",
  "Set up a data container in the form of a database.",
  "Set up a new database for future use.",
  "Create a database to house various collections.",
  "Generate a custom database instance.",
  "Open a connection to a new database.",
  "Create a database based on given parameters.",
  "Generate a new schema for a database.",
  "Set up a personalized database system.",
  "Create a new database structure.",
  "Establish a fresh storage system in the form of a database.",
  "Create a database to hold user data.",
  "Create a structured database.",
  "Create a database to store collections.",
  "Initialize a database for a new project.",
  "Set up a new database for an application.",
  "Create a database with the given name and attributes.",
  "Create an empty database to be populated later.",
  "Design and create a custom database.",
  "Generate a new database with specific configurations.",
  "Create a database with a given schema.",
  "Create a new database to manage information.",
  "Create a fresh data storage solution in the form of a database.",
  "Start a new database instance to manage records.",
  "Set up a new container for data storage.",
  "Open a new database for operational use.",
  "Create a database to handle transactional data.",
  "Start a database for managing collections.",
  "Create a database for storing user information.",
  "Create a secure database for storing sensitive data.",
  "Create a database with customized indexing.",
  "Initiate a database to support your application.",
  "Open a database to store your project data.",
  "Create a robust and efficient database for business data.",
  "Create a scalable database for handling large amounts of data.",
  "Establish a new relational database.",
  "Create a NoSQL database for flexible data storage.",
  "Create a structured database to manage complex queries.",
  "Generate a new database to handle your project requirements.",
  "Create a data container to store various documents.",
  "Create a functional database for data management.",
  "Establish a custom database for your specific needs.",
  "Create a database with the necessary fields and collections.",
  "Create a clean, new database to begin fresh.",
  "Establish a database to keep track of events.",
  "Create a new database for quick retrieval of information.",
  "Open a new storage space for your project data.",
  "Generate a new data storage system.",
  "Create a new database for tracking user progress.",
  "Set up a database to organize product information.",
  "Set up a new database for your business analytics.",
  "Create a database to store customer details.",
  "Initialize a new database with user-friendly attributes.",
  "Set up a database to track inventory.",
  "Create a data storage system for cataloging books.",
  "Set up a database for managing employee records.",
  "Create a new database to track transactions.",
  "Establish a database system to store sales data.",
  "Set up a database to manage student records.",
  "Create a customized database for your application.",
  "Generate a new database with specific attributes.",
  "Create a database to handle various queries.",
  "Open a new database to manage financial records.",
  "Create a fresh database for organizing medical records.",
  "Generate a new database for tracking product orders.",
  "Create a database to keep track of company projects.",
  "Set up a database for client information.",
  "Create a database for storing organizational data.",
  "Create a system for tracking orders with a database.",
  "Open a database to store patient details.",
  "Generate a secure database to store personal information.",
  "Create a database for securely managing documents.",
  "Generate a new database to manage customer interactions.",
  "Create a database for logging employee attendance.",
  "Create a system for maintaining customer feedback in a database.",
  "Generate a new database to track production schedules.",
  "Create a database for tracking maintenance records.",
  "Set up a new database for logging network activity.",
  "Generate a new database to hold sensitive corporate data.",
  "Create a database to manage project timelines.",
  "Set up a relational database to organize your data.",
  "Create a database for managing a blog's posts.",
  "Set up a database to monitor customer subscriptions.",
  "Create a new database to manage orders and shipments.",
  "Generate a database system for handling ecommerce transactions.",
  "Create a database for tracking marketing campaigns.",
  "Generate a new database to analyze user engagement.",
  "Create a database system to manage surveys.",
  "Create a fresh database to handle real-time data.",
  "Establish a system for recording and querying data.",
  "Generate a database for creating data reports.",
  "Set up a database to organize media files.",
  "Create a new database to store event details.",
  "Generate a system for handling user-generated content in a database.",
  "Set up a database to manage donations.",
  "Create a database to manage content uploads.",
  "Create a new database to keep track of user ratings.",
  "Generate a new database to handle booking systems.",
  "Set up a database to track subscription plans.",
  "Create a database for maintaining personal logs.",
  "Create a fresh database to store user preferences.",
  "Generate a new database to track user behavior.",
  "Set up a database for organizing educational resources.",
  "Create a new database for storing inventory data.",
  "Set up a system to handle queries against a database.",
  "Create a new database to track personal finances.",
  "Generate a database for logging event attendance.",
  "Set up a secure database to handle sensitive financial data.",
  "Create a new database for managing media playlists.",
  "Create a database to store project metadata.",
  "Establish a database for logging customer service tickets.",
  "Generate a new database for managing user accounts.",
  "Create a database to track application bugs.",
  "Create a database to store purchase history.",
  "Generate a fresh database to manage memberships.",
  "Create a data storage solution for employee performance tracking.",
  "Generate a new database for storing historical data.",
  "Create a new system for managing work orders.",
  "Set up a database to manage a ticketing system.",
  "Create a database for managing academic records.",
  "Generate a new database to track website traffic.",
  "Create a fresh database for storing product reviews.",
  "Set up a database for managing inventory levels.",
  "Generate a new database to store shipping details.",
  "Create a database for logging employee performance.",
  "Create a fresh database to track personal goals.",
  "Generate a database for cataloging user activity.",
  "Create a new database to manage payroll data.",
  "Generate a new database to store customer interactions.",
  "Create a system for storing and querying purchase records.",
  "Set up a database for managing training programs.",
  "Create a new database for managing tasks and to-dos.",
  "Generate a database for logging system errors.",
  "Create a fresh database for managing organization structure.",
  "Create a new database to store product specifications.",
  "Generate a system to track user logins with a database.",
  "Set up a database to monitor website uptime.",
  "Create a fresh database to track media content.",
  "Create a new database for handling recruitment data."
]

async function readConditionData(nameOfDB, nameOfCollection, atrs) {
  const client = new MongoClient(uri);
  
  try {
    // Connect to the database
    await client.connect();

    // Get database and collection references
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);

    // Fetch all documents
    const res = await collection.find({}).toArray();

    // Use a Set to ensure uniqueness
    const uniqueResults = new Set();

    // Apply filters dynamically
    const response = res.filter((doc) => {
      const matches = atrs.every(({ field, operator, value }) => {
        if (Array.isArray(value)) {
          // Handle array of values (like `$in` in MongoDB)
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

async function updateData(nameOfDB, nameOfCollection, atrs, changeAtrs) {
  const client = new MongoClient(uri);

    
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db(nameOfDB);
    const collection = database.collection(nameOfCollection);

    // Get data to update based on conditions
    const dataToUpdate = await readConditionData(nameOfDB, nameOfCollection, atrs);
    const response = [];

    
    // Iterate over the database and check if the _id matches
    for (const data of dataToUpdate) {
        
        // Assuming the data contains _id as an ObjectId
        const filter = { _id:(new ObjectId(data._id)) }; // Convert string _id to ObjectId
        

      // Update the specific field in the database
      const update = { $set: { [changeAtrs['field']]: changeAtrs['value'] } };

      // Perform the update operation
      const result = await collection.updateOne(filter, update);
      response.push(result);
    }

    // Return the update results
    return `${response.length} data affected!`;
  } catch (error) {
    console.error("Error updating data:", error);
    return [];
  } finally {
    // Ensure the client is closed
    await client.close();
  }
}

// Usage Example
(async () => {
  const atrs = [
    { field: "age", operator: "<", value: 100 },
  ];

  const changeAtrs = {
    field: "name",
    value: "hogaya",
  };

  const results = await updateData("jenil", "pamrar", atrs, changeAtrs);
  console.log(results); // Logs the results of the update operations
})();
