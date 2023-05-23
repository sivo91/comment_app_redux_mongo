import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
         unique: true,
    },
    password: {
      type: String
    },
    image: {
        type: String
    }
}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)