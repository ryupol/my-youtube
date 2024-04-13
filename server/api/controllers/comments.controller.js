import Comments from "../../data/models/comments.js";

const getAllComments = async (req, res) => {
  try {
    const users = await Comments.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  const user_id = req.session.user.id;
  const video_id = req.params.video_id;
  const { text } = req.body;
  try {
    const newComment = await Comments.create({
      video_id,
      user_id,
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
      updated_at: new Date(),
      text,
    };

    const updateComment = await Comments.updateOne({ video_id, user_id }, { update });
    res.status(200).json({ comment: updateComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentByUserID = async (req, res) => {
  const userSession = req.session.user;
  try {
    if (!userSession) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await Comments.findById(userSession.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllComments, createComment, updateComment, getCommentByUserID };
