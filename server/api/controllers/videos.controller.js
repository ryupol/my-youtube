import mongoose from "mongoose";
import Videos from "../../models/videos.js";
import dotenv from "dotenv";
dotenv.config();

const getAllVideos = async (req, res) => {
  let { search_query = "" } = req.query;
  search_query = search_query.trim();

  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          title: {
            $regex: search_query,
            $options: "i",
          },
        },
      },
      { $unwind: "$user" },
      { $project: { "user.password": 0 } },
    ];
    const videos = await Videos.aggregate(pipeline);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newVideo = await Videos.create({
      title,
      thumbnail_url: process.env.THUMBNAIL_URL + req.file.filename,
      description,
      user_id: req.session.user.id,
    });

    res.status(200).json({ newVideo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getVideoByID = async (req, res) => {
  try {
    const videoID = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          _id: videoID,
        },
      },
      { $unwind: "$user" },
      { $project: { "user.password": 0 } },
    ];
    const videos = await Videos.aggregate(pipeline);
    res.status(200).json(videos[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addViewByID = async (req, res) => {
  try {
    const video_id = req.params.id;
    const updateView = await Videos.updateOne({ _id: video_id }, { $inc: { views: 1 } });
    res.status(200).json({ action: updateView });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllVideos, createVideo, getVideoByID, addViewByID };
