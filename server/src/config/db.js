import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;
let client;

const connectToDatabase = async () => {
  if (client) {
    console.log("🗂️ Using existing database connection");
    return client.db();
  }

  try {

    client = await MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 6,
    });

    console.log("🔥 Connection to MongoDB established successfully");

    return client.db();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;