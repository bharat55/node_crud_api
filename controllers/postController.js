const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// @desc to fetch all users posts
// @route GET /api/posts
// @access private

const getPosts = asyncHandler(async (req, res) => {
  const currentUserId = req.user.id;
  const posts = await Post.find({ user_id: currentUserId });
  res.status(200).json({ posts });
});

//@desc Create a post of current USER
//@route POST /api/posts
//@access private

const createPost = asyncHandler(async (req, res) => {
  console.warn(req.body);
  const { title, body } = req.body.post;

  if (!title) {
    res.status(422).json({ vaalidationError: "title can not be blank!!" });
  }

  const post = await Post.create({
    title: title,
    body: body,
    user_id: req.user.id,
  });

  if (!post) {
    res.status(422).json({ vaalidationError: "Something went wrong !!!" });
  }

  res.status(200).json({ post: post });
});

//@desc to get a post with a specific id
//@route GET /api/posts/:id
//@access Private
const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  console.warn(`postId = ${postId} and userId = ${req.user.id}`);
  const post = await Post.findOne({ _id: postId, user_id: req.user.id });
  if (!post) {
    res.status(401);
    res.json({ error: "Access denied!!! " });
  }
  res.status(200).json({ post: post });
});

//@desc to update a current users post
//@route PUT /api/posts/:id
//@access PRIVATE

const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const postFields = req.body.post;

  let post = await Post.findOne({ _id: postId, user_id: userId });

  if (!post) {
    res.status(401);
    res.json({ error: "Access denied!!! " });
  }

  const result = await Post.updateOne({ _id: postId }, req.body.post, {
    new: true,
  });

  res.status(200).json({ post: await Post.findOne({ _id: postId }) });
});

const deletePost = asyncHandler(async (req, res) => {
  let post = Post.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!post) {
    res.status(401);
    res.json({ error: "Access denied!!! " });
  }
  const result = await Post.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }

  res.status(200).json({ success: true });
});
module.exports = { getPosts, createPost, getPost, updatePost, deletePost };
