import { useEffect, useState } from "react"; 
import { useEditUserProfile, useFetchUserProfile } from "../hooks/user";
import { useForm } from "react-hook-form"; 
const UserProfile = () => {
	// Fetch user profile and edit user profile hooks
	const fetchUserProfile = useFetchUserProfile;
	const editUserProfile = useEditUserProfile;

	// State variables to manage user details and edit mode status
	const [userDetail, setUserDetail] = useState();
	const [editMode, setEditMode] = useState(false);

	// Destructuring functions from useForm to handle form submission and registration
	const { handleSubmit, register, reset } = useForm();

	// Function to handle form submission
	const onSubmit = async (data) => {
		await editUserProfile(data); // Call the editUserProfile function with form data
		reset(); // Reset the form
		setEditMode(false); // Exit edit mode
	};

	// useEffect to fetch user profile when the component mounts or editMode changes
	useEffect(
		() => async () => {
			fetchUserProfile(setUserDetail); // Fetch user profile and set user details
		},
		[editMode, fetchUserProfile] // Dependencies array to trigger useEffect when editMode or fetchUserProfile changes
	);

	return (
		<div className="w-5/6 h-3/4 my-auto bg-slate-700 rounded-md flex flex-col justify-evenly items-center md:w-1/2 lg:w-1/3 ">
			<h1 className="text-3xl text-white font-bold">User Detail</h1>
			<div className="w-5/6 h-3/4 flex flex-col gap-2 text-white text-base">
				<p className="w-full p-2 flex flex-col gap-1">
					<span>Name :</span>
					{!editMode ? (
						<span>{userDetail?.name || "null"}</span>
					) : (
						<input
							className="outline-none px-2 py-1 rounded-md text-black"
							{...register("name")}
							defaultValue={userDetail.name}></input>
					)}
				</p>
				<p className="w-full p-2 flex flex-col gap-1">
					<span>Username :</span>
					{!editMode ? (
						<span>{userDetail?.username}</span>
					) : (
						<input
							className="outline-none px-2 py-1 rounded-md text-black"
							{...register("username")}
							defaultValue={userDetail.username}></input>
					)}
				</p>
				<p className="w-full h-fit p-2 flex flex-col gap-1">
					<span>Email :</span>
					{!editMode ? (
						<span className="text-pretty h-fit">
							{userDetail?.email || "null"}
						</span>
					) : (
						<input
							className="outline-none px-2 py-1 rounded-md text-black"
							{...register("email")}
							defaultValue={userDetail.email}></input>
					)}
				</p>
				{!editMode ? (
					<button
						onClick={() => setEditMode(true)}
						type="button"
						className="bg-white text-black rounded-md w-fit px-5 py-3 font-bold cursor-pointer mx-auto">
						Edit Profile
					</button>
				) : (
					<button
						onClick={handleSubmit(onSubmit)}
						type="button"
						className="bg-white text-black rounded-md w-fit px-5 py-3 font-bold cursor-pointer mx-auto">
						Save Update
					</button>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
