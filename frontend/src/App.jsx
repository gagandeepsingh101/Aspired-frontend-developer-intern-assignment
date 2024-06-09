import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	useEffect(() => {
		if (document.cookie.includes("UserAuth")) {
			navigate("/profile");
		} else {
			navigate("/login");
		}
	}, []);
	return (
		<div className="w-screen h-screen  p-5 flex justify-center items-center">
			<Outlet></Outlet>
		</div>
	);
}

export default App;
