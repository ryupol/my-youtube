import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail_url: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  views: { type: Number, required: true, default: 0 },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Videos = mongoose.model("Videos", videoSchema);

export default Videos;
