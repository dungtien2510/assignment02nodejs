const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin");

// router auth
const { NotAuthError } = require("../util/errors");

const User = require("../models/user");

router.use((req, res, next) => {
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING 1.");
    return next(new NotAuthError("Not authenticated."));
  }

  const userId = req.headers.authorization;

  User.find({ _id: userId, isAdmin: true })
    .then((user) => {
      console.log(user);
      // return next();
      if (user.length > 0) {
        return next();
      } else {
        return next(new NotAuthError("Not authenticated."));
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/hotels", adminController.getHotels);

router.get("/rooms", adminController.getRooms);

// add new hotels
router.post("/addHotel", adminController.postAddHotel);

// delete hotel
router.post("/hotel/delete", adminController.deleteHotel);

// delete room
router.post("/room/delete", adminController.deleteRoom);

//add new room
router.post("/addRoom", adminController.postAddRoom);

//get title rooms
router.get("/titleRoom", adminController.getRoomTitle);

//get name Hotels
router.get("/nameHotels", adminController.getNameHotels);

//get transactions
router.get("/transactions", adminController.getTransactions);

//get Dash
router.get("/dash", adminController.getDash);

//get users
router.get("/users", adminController.getUsers);

//router get edit hotel
router.get("/hotel/edit", adminController.getHotelEdit);

//router post edit hotel
router.post("/postHotelEdit", adminController.postHotelEdit);

//  router get edit rooms
router.get("/room/edit", adminController.getRoomEdit);

//router post edit Room
router.post("/postRoomEdit", adminController.postRoomEdit);

module.exports = router;
