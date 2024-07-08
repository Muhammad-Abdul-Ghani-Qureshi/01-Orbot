const { MongoClient } = require("mongodb");

let database;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    console.log("Connected to MongoDB");
    database = client.db("orbot");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

function getDb() {
  if (!database) {
    throw new Error("Database connection not established!");
  }
  return database;
}

module.exports = {
  connectToDatabase,
  getDb,
};
