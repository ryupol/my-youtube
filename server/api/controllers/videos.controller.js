import mongoose from "mongoose";
import Videos from "../../models/videos.js";
import dotenv from "dotenv";
dotenv.config();

const getAllVideos = async (req, res) => {
  try {
    const videos = await Videos.find().populate({
      path: "user_id",
      select: "name username profile_url",
    });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchVideos = async (req, res) => {
  let { search_query = "" } = req.params;
  search_query = new RegExp(search_query.trim(), "i");

  try {
    const videos = await Videos.find({ title: search_query }).populate({
      path: "user_id",
      select: "name username profile_url",
    });
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
    const video = await Videos.findOne({ _id: videoID }).populate({
      path: "user_id",
      select: "name username profile_url subscriber",
    });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addViewByID = async (req, res) => {
  try {
    const video_id = req.params.id;
    const updateView = await Videos.updateOne(
      { _id: video_id },
      { $inc: { views: 1 } }
    );
    res.status(200).json({ action: updateView });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllVideos, searchVideos, createVideo, getVideoByID, addViewByID };
