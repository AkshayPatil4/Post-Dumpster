const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user")
const User = require("../models/user");

const router = express.Router();

router.post("/signup", userController.createUser );

router.post("/login", userController.userLogin);

module.exports = router;
