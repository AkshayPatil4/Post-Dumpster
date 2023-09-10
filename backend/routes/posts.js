const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post");
const extractFile = require("../middleware/file");
const Post = require("../models/post");
const checkAuth = require("../middleware/check_auth");

const router = express.Router();



router.post(
  "",
  checkAuth,
  extractFile,
  postController.creatPost
);

router.put(
  "/:id",
  checkAuth,
  extractFile,
  postController.updatePost
);

router.get("", postController.getPosts);

router.get("/:id", postController.getPost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
