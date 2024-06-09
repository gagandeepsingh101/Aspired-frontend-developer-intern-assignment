import { config } from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/db/connect.db.js";

config();

connectDB();

app.listen(8000, async () => {
	console.log("Server running on url: http://localhost:" + 8000);
});
