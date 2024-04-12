import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_url: {
    type: String,
    required: true,
    default: process.env.IMAGE_URL + "defaultProfile.png",
  },
  description: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
