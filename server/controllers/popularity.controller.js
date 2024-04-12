import Pop from "../mongodb/models/popularity.js";

const getAllPops = async (req, res) => {
  try {
    const pops = await Pop.find();
    res.status(200).json(pops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPop = async (req, res) => {
  try {
    const newPop = await Pop.create({
      video_id: req.body.video_id,
      views: 0,
      likes: 0,
      dislikes: 0,
    });

    res.status(201).json(newPop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPopByVideoID = async (req, res) => {
  try {
    const pop = await Pop.findOne({ video_id: req.params.video_id });
    res.status(200).json(pop);
  } catch (error) {
    res.status(404).json({ message: "Pop not found" });
  }
};

export { getAllPops, createPop, getPopByVideoID };
