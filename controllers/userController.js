const { User, Thought } = require("../models");

const userController = {
  // ---- Get all users ----
  async getUsers(req, res) {
    try {
      const users = await User.find()

        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ---- Get single user ----
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // ---- Create user ----
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log("Error in createUser", err);
      res.status(500).json(err);
    }
  },
  // ---- Update user ----
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!User) {
        return res.status(404).json(err);
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ---- Delete user ----
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      console.log("User deleted:", user);
      console.log("User's thoughts to delete:", user.thoughts);

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      return res.status(200).json({
        message: "User deleted along with associated thoughts and reactions!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // ---- Add Friend ----
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "no user with that Id!" });
      }
      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // ---- Delete Friend ----
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "No user with that Id!" });
      }
      return res.status(200).json(friend);
    } catch (err) {
      console.log(res);
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
