const {User} = require('../models/');

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user by id
  async deleteUser(req, res) {
    try{
      await User.findByIdAndDelete(req.params.userId)
      res.status(200).json({ message: `User ${req.params.userId} deleted.`})
    }catch (err){
      res.status(500).json(err);
    }
  },
  // update a user by id
  async updateUser(req, res) {
    try{
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
      res.json(user)
    }catch (err){
      res.status(500).json(err);
    }
  },
// add a friend for the user by id
  async addFriend(req, res){
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {$addToSet: {friends: req.params.friendId}}, {new: true})
      res.json(user)
    }catch(err){
      res.status(500).json(err);
    }
  },
// remove a friend for the user by id
  async deleteFriend(req, res){
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {$pull: {friends: req.params.friendId}}, {new: true})
      res.json(user)
    }catch(err){
      res.status(500).json(err);
    }
  },
};
