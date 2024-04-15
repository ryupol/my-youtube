import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema({
  name: { type: String, required: true },
  profile_url: {
    type: String,
    required: true,
    default: process.env.PROFILE_URL + "defaultProfile.png",
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  subscriber: { type: Number, required: true, default: 0 },
  description: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
