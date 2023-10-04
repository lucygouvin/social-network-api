const { Schema, model } = require("mongoose");

// Schema for User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
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

// Add virtual property friendCount
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize model
const User = model("user", userSchema);

module.exports = User;
