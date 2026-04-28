const express = require("express");
const { signIn, signUp, logout, getProfile, refreshAccessToken } = require("../controllers/authController");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/logout", logout);
router.get("/profile", getProfile);
router.post("/refresh-access-token", refreshAccessToken);

module.exports = router;