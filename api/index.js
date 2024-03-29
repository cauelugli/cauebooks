const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const dialogueRoute = require("./routes/dialogue");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/dialogue", dialogueRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
