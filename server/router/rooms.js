const express = require("express");
const router = express.Router();
const roomsController = require("../controller/rooms");

//auth router

const { NotAuthError } = require("../util/errors");

const User = require("../models/user");

router.use((req, res, next) => {
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING 1.");
    return next(new NotAuthError("Not authenticated."));
  }

  const userId = req.headers.authorization;

  User.findById(userId)
    .then((user) => {

      return next();
    })
    .catch((error) => {
      console.log(error);
    });
});

// post rooms
router.post("/", roomsController.postRooms);

module.exports = router;
