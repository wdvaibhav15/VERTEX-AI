import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import proxy from "express-http-proxy";
import protect from "./middleware/isLogin.js";
import { getCurrectUser } from "./controllers/userController.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

// Auth microservice
app.use( "/api/auth", proxy(process.env.AUTH_SERVICE_URL || "http://localhost:3001"));
app.get("/api/me", protect, getCurrectUser)


app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Gateway is up and running",
  });
});

app.listen(port, () => {
  console.log(`Gateway is running on port ${port}`);
});