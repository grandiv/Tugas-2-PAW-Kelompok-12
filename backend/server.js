const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");
const app = express();
const userRoutes = require("./src/routes/userRoutes");
const movieRoutes = require("./src/routes/movieRoutes");
const port = 5000;

dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.DATABASE_URI) {
  throw Error("Database conenction string not found");
}
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use("/api/movie", movieRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
