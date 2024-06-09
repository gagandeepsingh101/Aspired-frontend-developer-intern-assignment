import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
const router = new createBrowserRouter([{
	path: "/",
	element: <App></App>,
	children: [
		{
			path: "/login",
			element: <Login></Login>,
		},
		{
			path: "/profile",
			element: <UserProfile></UserProfile>,
		},
	],
}]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
