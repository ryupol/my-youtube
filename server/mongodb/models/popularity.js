import mongoose, { Schema } from "mongoose";

const popSchema = new Schema({
  video_id: { type: Schema.Types.ObjectId, ref: "Videos", required: true },
  views: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Pop = mongoose.model("Popularity", popSchema);

export default Pop;
