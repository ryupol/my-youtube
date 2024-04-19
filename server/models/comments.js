import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  video_id: { type: Schema.Types.ObjectId, ref: "Videos", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  text: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
