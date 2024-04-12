import Users from "../mongodb/models/users.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, confirm } = req.body;

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
    console.log(req.session.user);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(200).json({ message: "Couldn't find your username" });
    }
    if (user.password !== password) {
      return res.status(200).json({ message: "Wrong password." });
    }

    req.session.user = { id: user._id, username };
    console.log(req.session);
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
    console.log(req.session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSessionUser = async (req, res) => {
  try {
    const userSession = req.session.user;
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

export { getAllUsers, createUser, signIn, signOut, getSessionUser };
