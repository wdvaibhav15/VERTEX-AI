import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

export const login = async(req, res) => {
    try {
        const { token } =  req.body;
        const decoadedToken = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({firebaseUid:decoadedToken.uid});
        // if user is not exist create a new one

        if(!user){
            // create a new user
            user = await User.create({
                firebaseUid:decoadedToken.uid,
                name:decoadedToken.name,
                email:decoadedToken.email,
                avatar:decoadedToken.picture,
            })
        }
        
        // to generate seesion id
        const sessionId = crypto.randomUUID();
        await redis.set(`session-${sessionId}`, JSON.stringify({
            name:user.name,
            _id:user._id,
            email:user.email,
            avatar:user.avatar
        }),"EX",60*60*24*7); // expire in 7 days

        res.cookie("session", sessionId, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:1000*60*60*24*7
        })


        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"something went wrong",error})
    }
}


// logout user
export const logout = async(req, res) => {
    try {
        // deldete session
        const sessionId = req.cookies.session;
        await redis.del(`session-${sessionId}`);
        // delete cookie
        res.clearCookie("session");
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json({message:"something went wrong",error})
    }
}