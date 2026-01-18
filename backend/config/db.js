import mongoose from "mongoose";

export const mongooseOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export const connectWithOptions = async (uri) => {
  return mongoose.connect(uri, mongooseOptions);
};
