import axios from "axios";
import { setCookie } from "../utils/cookieAction.utils";

// Custom hook to log in the user
export const useLoginUser = async (userData) => {
	try {
		// Making a POST request to the login endpoint with user credentials
		const { data } = await axios.post(
			"http://localhost:8000/login",
			{
				username: userData.username,
				password: userData.password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: document.cookie, // Sending the current cookies for authorization
				},
			}
		);
		// Setting a cookie with the token received from the response
		setCookie("UserAuth", data.token, 7);
		console.log(data); // Logging the response data
		alert(data.message);
	} catch (error) {
		console.log(error); // Logging any errors that occur during the request
	}
};

// Custom hook to fetch the user profile
export const useFetchUserProfile = async (setUserDetail) => {
	try {
		// Making a GET request to the profile endpoint
		const {
			data: { userDetail, message },
		} = await axios.get("http://localhost:8000/profile", {
			headers: {
				Authorization: document.cookie, // Sending the current cookies for authorization
			},
		});
		// Setting the user detail state with the fetched data
		setUserDetail(userDetail);
		alert(message);
	} catch (error) {
		console.log(error); // Logging any errors that occur during the request
	}
};

// Custom hook to edit the user profile
export const useEditUserProfile = async (userData) => {
	try {
		// Making a POST request to update the profile
		const {message} = await axios.post(
			"http://localhost:8000/profile",
			{
				...userData, // Sending updated user data
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: document.cookie, // Sending the current cookies for authorization
				},
			}
		);
		// console.log(data); // Logging the response
		alert(message);
	} catch (error) {
		console.log(error); // Logging any errors that occur during the request
	}
};
