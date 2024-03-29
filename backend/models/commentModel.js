const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    productId: { type: String },
    comment: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userName: String,
        rate: Number,
        feedback: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
