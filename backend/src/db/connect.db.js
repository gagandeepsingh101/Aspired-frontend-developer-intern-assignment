import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI);
		console.log("Connection successfully established on host :" + conn.connection.host);
	} catch (error) {
		console.log("connecttion not established successfully");
	}
};
