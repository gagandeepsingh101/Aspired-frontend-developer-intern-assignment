import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			// unique: true, // Ensure username is unique
			trim: true,
		},
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			// unique: true, // Ensure email is unique
			trim: true,
			lowercase: true,
			match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // Add createdAt and updatedAt timestamps
	}
);

export const User = mongoose.model("User", userSchema);
