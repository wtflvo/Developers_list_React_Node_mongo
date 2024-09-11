const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const handleErrors = require("./errorHandlers/handleErrors");

const app = express();

app.use(express.json());

app.use(cors());

mongoose
	.connect("mongodb://localhost:27017/mydatabase")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

app.use("/developer", require("./routes/developer"));
app.use("/", handleErrors);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
