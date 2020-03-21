const mongoose = require("mongoose");
const User = mongoose.model("User");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const jwt = require("../token/index");
const { verifyEmail } = require("../nodemailer");

const { vaidationSignUp, vaidationSignIn } = require("../validation/index");

let UserverifiedCode = email => {
  const VerifiedCode = md5(email + Date.now());
  return VerifiedCode;
};

exports.validateSignup = (req, res, next) => {
  const User = {
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword
  };

  const { valid, errors } = vaidationSignUp(User);

  if (!valid) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.signup = async (req, res) => {
  const { email, password, category } = req.body;
  await User.findOne({ email }).then(result => {
    if (result && result !== "null") {
      if (result.email === email) {
        return res.status(400).json({
          errors: {
            email: "email already exists"
          }
        });
      }
    }
  });

  const VerifiedCode = UserverifiedCode(email);
  const user = new User({
    email,
    password,
    category,
    isVerified: false,
    VerifiedCode
  });
  user
    .save()
    .then(() => {
      return res.status(200).send({
        message: {
          success: "account created successfully. check your mail box"
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.validateSignin = (req, res, next) => {
  const User = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = vaidationSignIn(User);

  if (!valid) {
    return res.status(400).json({ errors });
  }
  next();
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  await User.findOne({ email }).then(async result => {
    if (result === null) {
      return res.status(400).json({
        errors: {
          email: "no user found"
        }
      });
    }
    if (result && result !== "null") {
      console.log(result.isVerified);
      if (result.isVerified === false) {
        return res.status(400).json({
          errors: {
            email: "Email not verify",
            invalid: true
          }
        });
      }
    }

    if (result && result.password !== "null") {
      let isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: {
            password: "Password not match"
          }
        });
      }
    }

    const { _id, category, email, isVerified, createdAt, updatedAt } = result;

    const SigninInfo = {
      _id,
      category,
      email,
      isVerified,
      createdAt,
      updatedAt,
      isValidToken: true
    };

    const token = jwt.generateToken(SigninInfo);
    return res.status(200).json({
      token
    });
  });
};

exports.restPassword = (req, res) => {
  const { email } = req.body;
  const VerifiedCode = UserverifiedCode(email);

  User.findOne({ email: email })
    .then(async user => {
      if (user === null || user === "undefined") {
        return res.status(400).json({
          errors: {
            email: "User not found"
          }
        });
      }
      await User.findOneAndUpdate(
        {
          email: email
        },
        { $set: { VerifiedCode: VerifiedCode } },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        message: {
          success: true
        }
      });
    })

    .catch(err => {
      console.log(err);
    });
};

exports.emailVerify = (req, res) => {
  const { email } = req.body;
  const VerifiedCode = UserverifiedCode(email);

  User.findOne({ email: email })
    .then(async user => {
      if (user === null || user === "undefined") {
        return res.status(400).json({
          errors: {
            email: "User not found"
          }
        });
      }
      await User.findOneAndUpdate(
        {
          email: email
        },
        { $set: { VerifiedCode: VerifiedCode } },
        { new: true, runValidators: true }
      );

      await verifyEmail(email, VerifiedCode);

      return res.status(200).json({
        message: {
          success: true
        }
      });
    })

    .catch(err => {
      console.log(err);
    });
};

exports.verifyEmail = (req, res) => {
  const { VerifiedCode } = req.params;

  User.findOne({ VerifiedCode: VerifiedCode })
    .then(async user => {
      if (user === null || user === "undefined") {
        return res.status(400).json({
          errors: {
            message: "token not found"
          }
        });
      }
      await User.findOneAndUpdate(
        {
          VerifiedCode
        },
        { $set: { VerifiedCode: null, isVerified: true } },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        message: {
          success: true
        }
      });
    })

    .catch(err => {
      console.log(err);
    });
};

exports.signout = async (req, res) => {
  res.clearCookie("next-connect.sid");
  req.logout();
  res.json({ message: "You are now signout" });
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
};

exports.isAlreadyLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
