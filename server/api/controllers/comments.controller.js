import mongoose from "mongoose";
import Comments from "../../models/comments.js";

const getAllComments = async (req, res) => {
  try {
    const users = await Comments.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  const video_id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
  const { text } = req.body;
  try {
    const newComment = await Comments.create({
      video_id,
      user_id: req.session.user.id,
      text,
    });
    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  const user_id = req.session.user.id;
  const video_id = req.params;
  const { text } = req.body;
  try {
    const update = {
      text,
      updated_at: new Date(),
    };

    const updateComment = await Comments.updateOne({ video_id, user_id }, { update });
    res.status(200).json({ comment: updateComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {};

const getCommentByVideoID = async (req, res) => {
  try {
    const video_id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $match: { video_id } },
      { $unwind: "$user" },
    ];
    const comment = await Comments.aggregate(pipeline);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllComments, createComment, updateComment, deleteComment, getCommentByVideoID };
