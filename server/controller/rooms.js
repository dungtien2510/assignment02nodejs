const Rooms = require("../models/room");
const mongoose = require("mongoose");
exports.postRooms = (req, res, next) => {
  const idRooms = req.body.rooms; //.map((room) => mongoose.Types.ObjectId(room));
  console.log(idRooms);
  Rooms.find({ _id: { $in: req.body.rooms } })
    .exec()
    .then((rooms) => {
      console.log("fetched rooms");
      res.json(rooms);
    })
    .catch((err) => console.log(err));
};
