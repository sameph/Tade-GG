

import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		if (!process.env.MONGO_URI) {
			throw new Error("MongoDB URI is not defined in environment variables");
		}
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); 
	}
};
