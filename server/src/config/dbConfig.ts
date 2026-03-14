import mongoose from "mongoose";

export async function connectDb() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("MONGO URI is missing");
      throw new Error("MONGO URI is missing");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (!conn.connection.host) {
      throw new Error("DB Connection Err");
    }

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB Connection Err", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    console.log(`DB CONN SUCCESS - ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.log("DB Err:", error);
    process.exit(1);
  }
}
