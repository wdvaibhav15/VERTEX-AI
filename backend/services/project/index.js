import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/project.route.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

// Database connection
connectDB();

app.use("/api/project", router);


app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Project service is running",
  });
});

app.listen(port, () => {
  console.log(`Project service is running on port ${port}`);
});