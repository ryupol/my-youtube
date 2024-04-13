import mongoose, { Schema } from "mongoose";

const userActionSchema = new Schema({
  video_id: { type: Schema.Types.ObjectId, ref: "videos", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  rating: { type: Boolean }, // 1: like, 0: dislike, null: no rate
  is_subscribe: { type: Boolean, required: true, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const UserActions = mongoose.model("UserActions", userActionSchema);

export default UserActions;
