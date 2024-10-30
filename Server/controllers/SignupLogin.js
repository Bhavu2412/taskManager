const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.SignUp = (req, res, next) => {
  let saveU;
  const err = validationResult(req);
  console.log(err);
  if (!err.isEmpty()) {
    const error = new Error("Validation failed!!!");
    error.statusCode = 422;
    throw error;
  }
  const username = req.body.username;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const error = new Error(
          "User with the emailId exists! Please try with another email."
        );
        error.statusCode = 422;
        throw error;
      }
      return User.findOne({ username: username });
    })
    .then((user) => {
      if (user) {
        const error = new Error(
          "User with the username exists! Please try with another username."
        );
        error.statusCode = 422;
        throw error;
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPwd) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPwd,
        username: username,
      });
      saveU = user;
      return user.save();
    })
    .then((result) => {
      // Create JWT token after user is created
      const token = jwt.sign(
        { userId: saveU._id, email: saveU.email },
        process.env.SECRET_KEY, // Use your secret from .env
        { expiresIn: "1h" } // Token expiration time
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎉 Signup Successful! Welcome to AppName!",
        html: `
                    <div style="padding: 20px; background-color: #f4f4f4; border-radius: 10px; font-family: Arial, sans-serif;">
                        <h1 style="color: #4CAF50;">Welcome to AppName! 🎉</h1>
                        <p>Dear ${name},</p>
                        <p>Congratulations on successfully registering! We're thrilled to have you join our community.</p>
                        <h2 style="color: #4CAF50;">Your Account Details:</h2>
                        <ul style="list-style-type: none; padding: 0;">
                            <li><strong>Name:</strong> ${name}</li>
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Username:</strong> ${username}</li>
                        </ul>
                        <p style="margin-top: 20px;">If you have any questions, feel free to <a href="mailto:support@appname.com" style="color: #4CAF50;">contact us</a>.</p>
                        <p>Happy exploring! 🎊</p>
                        <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                            &copy; ${new Date().getFullYear()} AppName. All rights reserved.
                        </footer>
                    </div>
                `,
      };
      return transporter.sendMail(mailOptions).then(() => token); // Return the token after sending mail
    })
    .then((token) => {
      res.status(200).json({
        message: "User created successfully",
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.LogIn = (req, res, next) => {
  let luser, token, passlen;
  const searchQuery = {
    $or: [{ username: req.body.username }, { email: req.body.email }],
  };

  const password = req.body.password;
  User.findOne(searchQuery)
    .then((user) => {
      if (!user) {
        const err = new Error("User does not exist");
        err.statusCode = 404;
        throw err;
      }
      luser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Password does not match");
        err.statusCode = 404;
        throw err;
      }
      token = jwt.sign(
        {
          email: luser.email,
          userId: luser._id,
          name: luser.name,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        message: "User logged in!!!",
        user_name: luser.name,
        email: luser.email,
        username: luser.username,
        passlen: password.length,
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.ForgetPass = (req, res, next) => {
  const otp = Math.floor(Math.random() * 1000000);
  const email = req.body.email;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("No user found!!!");
        err.statusCode = 404;
        throw err;
      }
      user.otp = otp;
      user.otpExpire = new Date().getTime() + 300 * 1000;
      return user.save();
    })
    .then((result) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🔑 Password Reset OTP",
        html: `
                    <div style="padding: 20px; background-color: #f4f4f4; border-radius: 10px; font-family: Arial, sans-serif;">
                        <h1 style="color: #FF5722;">Password Reset Request 🔑</h1>
                        <p>Hi there!</p>
                        <p>We've received a request to reset your password. Use the OTP below to proceed:</p>
                        <h2 style="color: #FF5722;">Your OTP: <strong>${otp}</strong></h2>
                        <p>This OTP is valid for 5 minutes. If you didn't request a password reset, please ignore this email.</p>
                        <p>Thank you!</p>
                        <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                            &copy; ${new Date().getFullYear()} AppName. All rights reserved.
                        </footer>
                    </div>
                `,
      };
      return transporter.sendMail(mailOptions);
    })
    .then((info) => {
      res
        .status(200)
        .json({ message: "Email sent successfully. Please check your mail" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.VerifyOtp = (req, res, next) => {
  const { otp, email } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("User does not exist");
        err.statusCode = 404;
        throw err;
      }

      const time = new Date().getTime();
      if (time > user.otpExpire) {
        const err = new Error("OTP expired");
        err.statusCode = 404;
        throw err;
      }
      if (!otp) {
        return res.status(404).json({ message: "No OTP found" });
      } else if (otp == user.otp) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "✅ Password Changed Successfully!",
          html: `
                        <div style="padding: 20px; background-color: #f4f4f4; border-radius: 10px; font-family: Arial, sans-serif;">
                            <h1 style="color: #4CAF50;">Your Password has been Changed! ✅</h1>
                            <p>Hi ${user.name},</p>
                            <p>Your password has been successfully changed. If you did not make this change, please contact our support immediately.</p>
                            <p>Stay secure and happy browsing! 🌐</p>
                            <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                                &copy; ${new Date().getFullYear()} AppName. All rights reserved.
                            </footer>
                        </div>
                    `,
        };
        return transporter.sendMail(mailOptions).then((info) => {
          return res.status(200).json({ message: "OTP verified" });
        });
      } else {
        const err = new Error("OTP does not match!!!");
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 404;
      }
      next(err);
    });
};

exports.resetPass = (req, res, next) => {
  let luser;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("User does not exist");
        err.statusCode = 404;
        throw err;
      }
      luser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPwd) => {
      luser.password = hashedPwd;
      return luser.save();
    })
    .then((result) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🔒 Password Reset Confirmation",
        html: `
                    <div style="padding: 20px; background-color: #f4f4f4; border-radius: 10px; font-family: Arial, sans-serif;">
                        <h1 style="color: #2196F3;">Password Reset Successful! 🔒</h1>
                        <p>Dear ${luser.name},</p>
                        <p>Your password has been reset successfully. If you did not initiate this request, please reach out to us immediately.</p>
                        <p>Thank you for being a part of our community! 🌟</p>
                        <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                            &copy; ${new Date().getFullYear()} AppName. All rights reserved.
                        </footer>
                    </div>
                `,
      };
      return transporter.sendMail(mailOptions);
    })
    .then((info) => {
      res.status(200).json({ message: "Password changed successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
