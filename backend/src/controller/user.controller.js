import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../model/User.model.js";

// Helper function for error logging
const handleError = (res, error, message) => {
	console.log(`${message} : ${error.message}`);
	res.status(500).json({
		success: false,
		message: message,
		error: error.message,
	});
};

// User Login Controller
export const loginController = async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			username,
			password: hashedPassword,
		});
		await user.save();
		const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
		res.cookie("UserAuth", jwtToken).json({
			success: true,
			message: "User login successfully",
			token: jwtToken,
		});
	} catch (error) {
		handleError(res, error, "Error in Registering User");
	}
};

// Edit Profile Controller
export const editProfileController = async (req, res) => {
	const { userId, ...updateData } = req.body;
	try {
		await User.findByIdAndUpdate(userId, updateData);
		res.json({
			success: true,
			message: "Profile updated successfully",
		});
	} catch (error) {
		handleError(res, error, "Error in Editing Profile");
	}
};

// Fetch Profile Controller
export const fetchProfileController = async (req, res) => {
	try {
		const { userId } = req.body;
		const userDetail = await User.findById(userId, {
			__v: 0,
			password: 0,
			_id: 0,
			createdAt: 0,
			updatedAt: 0,
		});
		if (userDetail) {
			res.json({
				success: true,
				userDetail: userDetail,
				message: "User Profile fetch successfully",
			});
		} else {
			res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
	} catch (error) {
		handleError(res, error, "Error in Fetching Profile");
	}
};
