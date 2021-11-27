const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB.");
});

app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
  console.log("🚀 ~ file: index.js ~ line 32 ~ req", req.body)
    
    cb(null, req.body.name);
  },
});
const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8800, () => {
  console.log("Server is running!");
});
