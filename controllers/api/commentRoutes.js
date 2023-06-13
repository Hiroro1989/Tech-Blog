const router = require("express").Router();
const { Comment, Post, User } = require("../../models");

//get specific post to get comments
router.get("/:post_id", async (res, req) => {
  try {
    const postC = await Post.findByPk(req.params.post_id, {
      include: [{ model: Comment, include: User }, User],
    });
    res.status(200).json(postC);
  } catch (err) {
    res.status(500).json({ message: "Failed to get comments" });
  }
});

//create comment
router.post("/", async (req, res) => {
  try {

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create a comment" });
  }
});

module.exports = router;
