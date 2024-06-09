import express from "express";
import {
	editProfileController,
	fetchProfileController,
	loginController,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile", verifyToken, fetchProfileController);
userRouter.post("/profile", verifyToken, editProfileController);

userRouter.post("/login", loginController);

export default userRouter;
