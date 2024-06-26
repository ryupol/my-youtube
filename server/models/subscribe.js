import mongoose, { Schema } from "mongoose";

const subscribeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  sub_to_user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

export default Subscribe;
