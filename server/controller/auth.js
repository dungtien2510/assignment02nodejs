const User = require("../models/user");
const { Error } = require("./error");

const jwt = require("jsonwebtoken");

// create a new account
exports.postSignup = async (req, res, next) => {
  const userData = await User.findOne({ userName: req.body.userName }).exec();
  console.log(userData);
  if (userData) {
    return next(new Error("user already exists", 403));
  }
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
  });
  user
    .save()
    .then((result) => {
      console.log("created user");
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//login
exports.postLogin = (req, res, next) => {
  User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  })
    .exec()
    .then((result) => {
      if (result) {
        console.log("login successful");
        return res.json(result);
      } else {
        return next(new Error("Invalid user or password", 402));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
