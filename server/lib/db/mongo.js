require("dotenv").config({ silent: true });
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

async function connectToMongo() {
  try {
    if (!mongoUri) {
      throw new Error("connection failed to mongo, mongoUri is not set");
    }
    mongoose.set({ strictQuery: true });
    await mongoose.connect(mongoUri);
    console.log("connected to mongoDb");
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connectToMongo;
