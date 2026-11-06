import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name:{ type:String, required: true, trim: true},
    email:{ type:String, required: true, unique: true, trim: true, lowercase: true},
    avatar:{type: String, default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"},

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;