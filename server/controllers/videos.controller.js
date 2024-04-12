import Videos from "../mongodb/models/videos.js";
import videosPipeline from "../mongodb/pipeline/videos.pipeline.js";
import Pop from "../mongodb/models/popularity.js";
import dotenv from "dotenv";
dotenv.config();

const getAllVideos = async (req, res) => {
  try {
    const videos = await Videos.aggregate(videosPipeline);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newVideo = await Videos.create({
      title,
      thumbnail_url: process.env.IMAGE_URL + req.file.filename,
      description,
      user_id: req.session.user.id,
    });
    const newPop = await Pop.create({
      video_id: newVideo._id,
      views: 0,
      likes: 0,
      dislikes: 0,
    });
    
    res.status(200).json({ newVideo, newPop });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getVideoByID = async (req, res) => {
  try {
    const videoID = req.params.id;
    const video = await Videos.findOne({ videoID });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllVideos, createVideo, getVideoByID };
