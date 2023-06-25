const express = require("express");
const router = express.Router();
const hotelsCotrollers = require("../controller/hotel");

// router auth
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

//get hotel by address
router.get("/", hotelsCotrollers.getHotels);

//post search
router.get("/search", hotelsCotrollers.getHotelSearch);

//get details hotel
router.get("/detail", hotelsCotrollers.getDetail);

module.exports = router;
