import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser())
app.use(morgan("dev"));

// auth service
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL || "http://localhost:3001"));
// user service
app.use("/user", proxy("http://localhost:3002"));
// product service
app.use("/product", proxy("http://localhost:3003"));




app.get("/", (req, res) => {
    return res.status(200).json({message:" Gateway is up and running"})
})



app.listen(port, () => {
    console.log(`Gateway is running on port ${port}`);
});