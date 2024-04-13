import Users from "../../data/models/users.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
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
      return res.status(200).json({ message: "That username is taken. Try another." });
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
      username,
      password,
    });

    req.session.user = { id: newUser._id, username };
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(200).json({ message: "Couldn't find your username" });
    }
    if (user.password !== password) {
      return res.status(200).json({ message: "Wrong password." });
    }

    req.session.user = { id: user._id, username };
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

const updateUser = async (req, res) => {
  const user_id = req.session.user.id;
  const { profile_url, name, newPassword } = req.body;
  try {
    let update = {};
    update["updated_at"] = new Date();

    if (profile_url) {
      update["profile_url"] = profile_url;
    }
    if (name) {
      update["name"] = name;
    }
    if (newPassword) {
      update["password"] = newPassword;
    }

    const updateUser = await Users.updateOne({ _id: user_id }, { update });
    res.status(201).json({ user: updateUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInSession = async (req, res) => {
  const userSession = req.session.user;
  try {
    if (!userSession) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await Users.findById(userSession.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, updateUser, signIn, signOut, getUserInSession };
