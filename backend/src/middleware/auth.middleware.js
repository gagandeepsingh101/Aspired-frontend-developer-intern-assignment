import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	try {
		const token =
			req.cookies.UserAuth ||
			(req.headers["authorization"] &&
				req.headers["authorization"].split("=")[1]);

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Please login to access user information",
			});
		}

		const publicKey = process.env.JWT_SECRET;
		if (!publicKey) {
			return res.status(500).json({
				success: false,
				message: "Server error: Public key not provided",
			});
		}

		const decodedToken = jwt.verify(token, publicKey);
		req.body.userId = decodedToken.userId;

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Invalid or expired token",
		});
	}
};
