const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "college",
  password: "Jenil.p12",
  port: 5432,
});

async function CheckDB(nameOfDB) {
  if (!nameOfDB) {
    console.log("Missing The name of Database!");
    
    return false;
  }
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: nameOfDB,
    password: "Jenil.p12",
    port: 5432,
  });
  let k = true;
  client
    .connect()
    .then(() => {
      console.log("Connected to Database:-" + nameOfDB);
      k = true;
    })
    .catch((err) => {
      console.error("Connection error", err.stack);
      k = false;
    });

  return k;
}

(async () => {
  const res = await CheckDB("college");
  console.log(res);
})();
