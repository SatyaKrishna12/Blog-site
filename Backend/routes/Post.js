const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
});

router.post("/", async (req, res) => {
  const { title, content, slug } = req.body;
  if (!title || !content || !slug) {
    return res
      .status(400)
      .json({ message: "Title, content, and slug are required" });
  }
  try {
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res
        .status(400)
        .json({ message: "Slug already exists. Please choose a different slug." });
    }

    const newPost = new Post({ title, content, slug });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
});
router.put("/:slug", async (req, res) => {
  const { title, content, slug } = req.body;
  if (!title || !content || !slug) {
    return res
      .status(400)
      .json({ message: "Title, content, and slug are required" });
  }
  try {
    if (slug !== req.params.slug) {
      const existingPost = await Post.findOne({ slug });
      if (existingPost) {
        return res
          .status(400)
          .json({ message: "Slug already exists. Please choose a different slug." });
      }
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { title, content, slug },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
});
router.delete("/:slug", async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
});

module.exports = router;
