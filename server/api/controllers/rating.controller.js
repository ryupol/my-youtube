import Rating from "../../models/rating.js";
import Videos from "../../models/videos.js";

const getAllRating = async (req, res) => {
  try {
    const rating = await Rating.find();
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLikeByID = async (req, res) => {
  const video_id = req.params.id;
  const user_id = req.session.user.id;

  try {
    const action = await Rating.findOne({ user_id, video_id });
    const actionExists = action !== null;

    let incLikes = 0;
    let incDislikes = 0;
    let updateRating;

    if (!actionExists) {
      updateRating = await Rating.create({ video_id, user_id, rating: "like" });
      incLikes = 1;
    } else if (action.rating === "like") {
      updateRating = await Rating.findOneAndDelete({ user_id, video_id });
      incLikes = -1;
    } else if (action.rating === "dislike") {
      updateRating = await Rating.updateOne(
        { user_id, video_id },
        { rating: "like" }
      );
      incLikes = 1;
      incDislikes = -1;
    }

    await Videos.updateOne(
      { _id: video_id },
      { $inc: { likes: incLikes, dislikes: incDislikes } }
    );

    res.status(200).json(updateRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDislikeByID = async (req, res) => {
  const video_id = req.params.id;
  const user_id = req.session.user.id;

  try {
    const action = await Rating.findOne({ user_id, video_id });
    const actionExists = action !== null;

    let incLikes = 0;
    let incDislikes = 0;
    let updateRating;

    if (!actionExists) {
      updateRating = await Rating.create({
        video_id,
        user_id,
        rating: "dislike",
      });
      incDislikes = 1;
    } else if (action.rating === "dislike") {
      updateRating = await Rating.findOneAndDelete({ user_id, video_id });
      incDislikes = -1;
    } else if (action.rating === "like") {
      updateRating = await Rating.updateOne(
        { user_id, video_id },
        { rating: "dislike" }
      );
      incLikes = -1;
      incDislikes = 1;
    }

    await Videos.updateOne(
      { _id: video_id },
      { $inc: { likes: incLikes, dislikes: incDislikes } }
    );

    res.status(200).json(updateRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatingByVideoID = async (req, res) => {
  const video_id = req.params.id;
  try {
    const user_id = req.session.user.id;
    const rating = await Rating.findOne({ user_id, video_id });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserLikeVideos = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const rating = await Rating.find({ user_id, rating: "like" });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllRating,
  updateLikeByID,
  updateDislikeByID,
  getRatingByVideoID,
  getUserLikeVideos,
};
