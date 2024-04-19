import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  video_id: { type: Schema.Types.ObjectId, ref: "Videos", required: true },
  rating: { type: String, required: true }, // like, dislike
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
