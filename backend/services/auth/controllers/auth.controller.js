import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";

export const login = async(req, res) => {
    try {
        const { token } =  req.body;
        const decoadedToken = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({firebaseUid:decoadedToken.uid});

        if(!user){
            // create a new user
            user = await User.create({
                firebaseUid:decoadedToken.uid,
                name:decoadedToken.name,
                email:decoadedToken.email,
                avatar:decoadedToken.picture,
            })
        }
        

        return res.status(200).json({decoadedToken})
    } catch (error) {
        return res.status(500).json({message:"something went wrong",error})
    }
}