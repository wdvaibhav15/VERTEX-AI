import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
connectDB();

app.get("/",(req, res)=>{
    return res.status(200).json({message: " authServices stated"})
})

app.listen(port, ()=>{
    console.log(`authServices is running on port ${port}`);
})
