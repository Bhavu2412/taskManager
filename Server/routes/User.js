const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const userController = require("../controllers/SignupLogin");

router.post(
  "/signup",
  [
    body("email").isEmail().trim(),
    body("username").trim(),
    body("name").trim(),
    body("password").trim(),
  ],
  userController.SignUp
);
router.post("/login", userController.LogIn);
router.post("/forgetpassword", userController.ForgetPass);
router.post("/otpverify", userController.VerifyOtp);
router.post("/reset", userController.resetPass);

module.exports = router;
