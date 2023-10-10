const { Schema, model } = require("mongoose");
const Reaction = require('./Reaction')

// Schema for Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.toLocaleDateString("en-US"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    toObject: {
      virtuals: true,
    },

    id: false,
  }
);

// Add virtual for reactionCount
thoughtSchema
.virtual('reactionCount').get(function() {
    return this.reactions.length})

// Instantiate Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
