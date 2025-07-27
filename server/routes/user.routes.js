const express = require("express");
const router = express.Router();
const isAuth = require("../auth/is.auth");
const signupController = require("../controllers/signup.controller");
const loginController = require("../controllers/login.controller");
const getUserController = require("../controllers/get-user.controller");
const sendOTP = require("../controllers/send-otp.controller");
const resetPassword = require("../controllers/reset-password.controller");
const updateProfilePic = require("../controllers/profile-pic.controller");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/send-otp", sendOTP);
router.post("/reset-password", resetPassword);
router.get("/get-user", isAuth, getUserController);
router.post("/update-profile-pic", isAuth, updateProfilePic);

module.exports = router;
