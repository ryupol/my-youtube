import Pop from "../../data/models/popularity.js";

const getAllPops = async (req, res) => {
  try {
    const pops = await Pop.find();
    res.status(200).json(pops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addView = async (req, res) => {
  const video_id = req.params.video_id;
  try {
    const updatePop = await UserActions.updateOne({ video_id }, { $inc: { views: 1 } });
    res.status(200).json({ action: updatePop });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export { getAllPops, addView, getPopByVideoID };
