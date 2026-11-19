import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import fileRouter from "./routes/file.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

// Database connection
connectDB();

app.use("/", fileRouter);


app.get("/", (req, res) => {
  return res.status(200).json({
    message: "File service is running",
  });
});

app.listen(port, () => {
  console.log(`File service is running on port ${port}`);
});