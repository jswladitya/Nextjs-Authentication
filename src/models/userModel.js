import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true, "Please provide email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please provide email"]
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    forgotPasswordToken :String,
    forgotPasswordTokenExpiry :Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

//in nextjs if using mongodb, then just put or symbol 
// it means if model is already made then use that or make new model
const User = mongoose.model.users || mongoose.model("users", userSchema)

export default User