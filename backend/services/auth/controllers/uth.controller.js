import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";


export const login = async(req, res) => {
    try {
        const { token } =  req.body;
        const decoadedToken = getAuth(app).verifyIdToken(token);
    } catch (error) {
        res.status(400).json({message: "cridentials wrong: login failed"})
    }
}