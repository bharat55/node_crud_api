const express = require("express");
const router = express.Router();
const validToken = require("../middleware/validTokenHandler");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.use(validToken);

router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
