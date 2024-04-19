import Users from "../../models/users.js";
import dotenv from "dotenv";
dotenv.config();
const sessionMap = (api) => {
  return {
    id: api._id,
    name: api.name,
    username: api.username,
    profile_url: api.profile_url,
  };
};

// --------------------------------------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().populate({
      path: "video_id",
      select: "thumbnail_url title views created_at",
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, password, confirm } = req.body;
  try {
    const userExists = await Users.exists({ username });
    if (userExists) {
      return res
        .status(200)
        .json({ message: "That username is taken. Try another." });
    }

    const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!usernamePattern.test(username)) {
      return res.status(200).json({ message: "Enter a valid username." });
    }

    if (password !== confirm) {
      return res.status(200).json({ message: "Password does not match" });
    }

    const newUser = await Users.create({
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username: "@" + username,
      password,
    });
    req.session.user = sessionMap(newUser);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const name = req.body.name;
    const user_id = req.session.user.id;
    let update = {
      name: name,
      updated_at: new Date(),
    };
    if (req.file) {
      const profile_url = process.env.PROFILE_URL + req.file.filename;
      update["profile_url"] = profile_url;
    }
    const updateUser = await Users.findOneAndUpdate({ _id: user_id }, update, {
      new: true,
    });
    req.session.user = sessionMap(updateUser);
    res.status(200).json({ user: updateUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  let { username, password } = req.body;
  username = "@" + username;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(200).json({ message: "Couldn't find your username" });
    }
    if (user.password !== password) {
      return res.status(200).json({ message: "Wrong password." });
    }

    req.session.user = sessionMap(user);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to sign out" });
      }
      res.status(200).json({ message: "Signed out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSession = async (req, res) => {
  const userSession = req.session.user;
  if (!userSession) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  return res.status(200).json(userSession);
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;
  try {
    const pipeline = [
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "user_id",
          as: "videos",
        },
      },
      {
        $match: { username: { $eq: username } },
      },
      { $project: { password: 0 } },
    ];

    const users = await Users.aggregate(pipeline);
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  createUser,
  updateUser,
  signIn,
  signOut,
  getUserSession,
  getUserByUsername,
};
