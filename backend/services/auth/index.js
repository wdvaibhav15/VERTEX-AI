import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Database connection
connectDB();

// Auth routes
app.use("/", authRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Auth service is running",
  });
});

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});