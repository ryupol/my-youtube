import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail_url: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const Videos = mongoose.model("Videos", videoSchema);

export default Videos;
