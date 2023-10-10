const { Thought, User, Reaction } = require("../models/");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select(
        "-__v"
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // post a new thought, add the new thought's id to the associated user's thoughts field
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Post created, but found no user with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // put to update thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { runValidators: true, new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete to remove thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      await Thought.findByIdAndDelete(req.params.thoughtId);
      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: `Thought ${req.params.thoughtId} deleted.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

//post a reaction to a thought
async addReaction(req, res){
    try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
  },

//delete a reaction by the reaction's reactionId value
async deleteReaction(req, res){
  console.log(req.params.reactionId)
    try {
    await Thought.findByIdAndUpdate(req.params.thoughtId, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new: true})
      res.json({message: `Reaction ${req.params.reactionId} deleted`})
    }catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  },

};
