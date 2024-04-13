import UserActions from "../../data/models/userActions.js";

const getAllUserActions = async (req, res) => {
  try {
    const users = await UserActions.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUserAction = async (req, res) => {
  const user_id = req.session.user.id;
  const video_id = req.params.video_id;
  const { rating, is_subscribe } = req.body;

  try {
    const update = {
      updated_at: new Date(),
      rating: rating === "like" ? true : rating === "dislike" ? false : undefined,
      is_subscribe: is_subscribe,
    };

    const actionExists = await UserActions.exists({ user_id, video_id });

    let updateAction;
    if (actionExists) {
      updateAction = await UserActions.updateOne({ video_id, user_id }, update);
    } else {
      updateAction = await UserActions.create({ video_id, user_id, ...update });
    }

    const updatePop = await Pop.updateOne(
      { video_id },
      { $inc: { likes: rating === "like" ? 1 : 0, dislikes: rating === "dislike" ? 1 : 0 } }
    );

    const updateUser = await User.updateOne({ _id: user_id }, { $inc: { subscriber: is_subscribe ? 1 : 0 } });

    res.status(201).json({ action: updateAction, pop: updatePop, user: updateUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserActionByUserID = async (req, res) => {
  const userSession = req.session.user;
  try {
    if (!userSession) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await UserActions.findById(userSession.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUserActions, createUserAction, getUserActionByUserID };
