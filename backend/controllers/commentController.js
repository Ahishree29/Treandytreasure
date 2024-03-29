const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

const addComment = asyncHandler(async (req, res) => {
  const { rating, review, productId } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    let existingComment = await Comment.findOne({ productId });

    if (existingComment) {
      
      existingComment.comment.push({
        userId: req.user._id,
        userName: req.user.name,
        rate: rating,
        feedback: review,
      });
      await existingComment.save();
      return res.status(200).json(existingComment);
    } else {
      
      const newComment = await Comment.create({
        productId: productId,
        comment: [
          {
            userId: req.user._id,
            userName: req.user.name,
            rate: rating,
            feedback: review,
          },
        ],
      });
      return res.status(200).json(newComment);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { addComment };
