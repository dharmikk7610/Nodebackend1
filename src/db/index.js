import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME;

const DB_CONNECTION = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Database connected successfully: ${data.connection.host}`);
  } catch (error) {
    console.log("Connection failed:", error);
  }
};

export default DB_CONNECTION;
