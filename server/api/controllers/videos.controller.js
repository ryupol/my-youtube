import Videos from "../../data/models/videos.js";
import Pop from "../../data/models/popularity.js";
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
        $lookup: {
          from: "popularities",
          localField: "_id",
          foreignField: "video_id",
          as: "popular",
        },
      },
      { $unwind: "$user" },
      { $unwind: "$popular" },
      {
        $match: {
          title: {
            $regex: search_query,
            $options: "i",
          },
        },
      },
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
    // Create field in Popularity collection
    const newPop = await Pop.create({
      video_id: newVideo._id,
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
