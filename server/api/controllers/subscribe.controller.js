import Users from "../../models/users.js";
import Subscribe from "../../models/subscribe.js";
import mongoose from "mongoose";

const getAllSub = async (req, res) => {
  try {
    const sub = await Subscribe.find();
    res.status(200).json(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSub = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const sub_to_user_id = req.body.user_id;

    await Promise.all([
      Subscribe.create({ user_id, sub_to_user_id }),
      Users.updateOne({ _id: sub_to_user_id }, { $inc: { subscriber: 1 } }),
    ]);

    res.status(200).json({ message: "Subscribe create successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSub = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const sub_to_user_id = req.body.user_id;

    await Promise.all([
      Subscribe.findOneAndDelete({ user_id, sub_to_user_id }),
      Users.updateOne({ _id: sub_to_user_id }, { $inc: { subscriber: -1 } }),
    ]);

    res.status(200).json({ message: "Subscribe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSubBySession = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const sub = await Subscribe.find({ user_id: userId }).populate({
      path: "sub_to_user_id",
      select: "name username profile_url",
    });
    res.status(200).json(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubByID = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const sub_to_user_id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const sub = await Subscribe.findOne({ user_id, sub_to_user_id });
    res.status(200).json(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllSub, createSub, deleteSub, getAllSubBySession, getSubByID };
