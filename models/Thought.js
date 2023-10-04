const { Schema, model } = require("mongoose");

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
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: "reaction",
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },

    id: false,
  }
);

// TODO: Add getter on createdAt date

// Add virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// Instantiate Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
