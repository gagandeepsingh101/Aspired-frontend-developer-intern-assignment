import { useForm } from "react-hook-form";
import { useLoginUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
	// Fetching loginUser function from the custom hook
	const loginUser = useLoginUser;
	const navigate = useNavigate();

	// Destructuring functions and form state from useForm
	const {
		handleSubmit, // Function to handle form submission
		register, // Function to register input fields
		reset, // Function to reset the form
		formState: { errors }, // Object to manage form errors
	} = useForm();

	// Function to handle form submission
	const onSubmit = async (data) => {
		// console.log(data); // Uncomment for Logging form data
		await loginUser(data); // Call the loginUser function with form data
		reset(); // Reset the form
		navigate("/profile");
	};

	return (
		<div className="w-2/3 h-3/4 my-auto bg-slate-700 rounded-md flex flex-col justify-evenly items-center md:w-1/2 lg:w-1/3 ">
			<p className="text-xl font-bold text-white"> Login Page </p>
			<form
				onSubmit={handleSubmit(onSubmit)} // Handling form submission
				className="w-5/6 h-2/3 flex flex-col gap-3">
				<label htmlFor="username" className="text-white">
					Enter your Username
				</label>
				<input
					className="outline-none px-2 py-1 rounded-md"
					{...register("username", { required: "Username is required" })} // Registering input field with validation
				/>
				<p
					className={
						"h-7 rounded-md text-center " +
						(errors.username && "text-red-700 bg-gray-400 font-bold")
					}>
					{errors.username ? errors.username.message : ""}
				</p>

				<label htmlFor="password" className="text-white">
					Enter your password
				</label>
				<input
					className="outline-none px-2 py-1 rounded-md"
					{...register("password", { required: "Password is required" })} // Registering input field with validation
				/>
				<p
					className={
						"h-7 rounded-md text-center " +
						(errors.password && "text-red-700 bg-gray-400 font-bold")
					}>
					{errors.password ? errors.password.message : ""}
				</p>

				<button
					type="submit"
					className="bg-white w-fit h-fit mx-auto px-5 py-2 font-bold rounded-md disabled:opacity-25 cursor-pointer"
					// disabled={watch("username") === "" || watch("password") === ""} // Uncomment to disable button if fields are empty
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
