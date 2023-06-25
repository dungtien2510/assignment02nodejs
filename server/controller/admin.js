const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");
const User = require("../models/user");

//get hotels
exports.getHotels = (req, res, next) => {
  // const page = req.query ? req.query.page : 0;
  Hotel.find()
    // .limit(8) .skip(2)
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get name hotels
exports.getNameHotels = (req, res, next) => {
  Hotel.find()
    .select("name _id")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

//get rooms
exports.getRooms = (req, res, next) => {
  const page = req.query ? req.query.page : 0;

  Room.find()
    // .limit(8) .skip(2)
    .exec()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};

//get title room
exports.getRoomTitle = (req, res, next) => {
  Room.find()
    .select("title _id")
    .exec()
    .then((result) => {
      res.json(result);
    });
};

// add new hotels
exports.postAddHotel = (req, res, next) => {
  const hotel = new Hotel({
    address: req.body.address,
    cheapestPrice: req.body.cheapestPrice,
    city: req.body.city,
    desc: req.body.desc,
    distance: req.body.distance,
    featured: req.body.featured,
    name: req.body.name,
    photos: req.body.photos,
    title: req.body.title,
    type: req.body.type,
    rooms: req.body.rooms,
  });
  hotel
    .save()
    .then((result) => {
      console.log("created Product");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete hotel
exports.deleteHotel = (req, res, next) => {
  Hotel.deleteOne({ _id: req.body.id })
    .then((result) => {
      console.log("deleted hotel");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

//delete room
exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.deleteOne({ _id: req.body.id });
    const hotel = await Hotel.find({ rooms: req.body.id }).then((result) => {
      result.forEach((h) => h.deleteToRoom(req.body.id));
    });
    res.json({ room, hotel });
  } catch {
    (error) => console.log(error);
  }
  Room.deleteOne({ _id: req.body.id })
    .then((result) => {
      console.log("deleted room");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

//add room
exports.postAddRoom = async (req, res, next) => {
  const room = new Room({
    title: req.body.title,
    price: req.body.price,
    desc: req.body.desc,
    maxPeople: req.body.maxPeople,
    roomNumbers: req.body.roomNumbers,
  });
  const hotel = await Hotel.findById(req.body.hotel);
  room
    .save()
    .then((result) => {
      console.log("added room");
      return result._id;
    })
    .then((idRoom) => {
      hotel.addToRooms(idRoom);
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

//get transactions
exports.getTransactions = (req, res, next) => {
  const page = req.query ? req.query.page : 0;
  Transaction.find()

    .exec()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};

//get Dash
exports.getDash = (req, res, next) => {
  User.find()
    .exec()
    .then((result) => {
      res.json(result.length);
    })
    .catch((err) => console.log(err));
};

//get Users
exports.getUsers = (req, res, next) => {
  const page = req.query ? req.query.page : 0;
  User.find()

    .exec()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};

//get hotel edit
exports.getHotelEdit = async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log(id);
    const dataHotel = await Hotel.findById(id).exec();
    const titleRoom = await Room.find().select("title _id").exec();
    res.json({ dataHotel, titleRoom });
  } catch {
    (error) => console.log(error);
  }
};

//post hotel edit
exports.postHotelEdit = (req, res, next) => {
  const hotelUpdate = {
    name: req.body.name,
    city: req.body.city,
    distance: req.body.distance,
    desc: req.body.desc,
    photos: req.body.photos,
    type: req.body.type,
    address: req.body.address,
    title: req.body.title,
    cheapestPrice: req.body.cheapestPrice,
    featured: req.body.featured,
    rooms: req.body.rooms,
  };
  Hotel.findOneAndUpdate({ _id: req.query.id }, hotelUpdate)
    .then((result) => {
      console.log("updated successfully");
      res.json(result);
    })
    .catch((error) => console.log(error));
};

//get Room edit
exports.getRoomEdit = async (req, res, next) => {
  try {
    const id = req.query.id;
    const dataRoom = await Room.findById(id).exec();
    const nameHotels = await Hotel.find().select("name _id").exec();

    res.json({ dataRoom, nameHotels });
  } catch {
    (error) => console.log(error);
  }
};

//post room edit
exports.postRoomEdit = async (req, res, next) => {
  try {
    const id = req.query.id;
    const roomUpdate = {
      desc: req.body.desc,
      type: req.body.type,
      title: req.body.title,
      price: req.body.price,
      maxPeople: req.body.maxPeople,
      roomsNumber: req.body.roomsNumber,
    };
    const hotel = await Hotel.findById(req.body.hotel);
    console.log("uasdf");
    Room.findOneAndUpdate({ _id: req.query.id }, roomUpdate).then((result) =>
      hotel.addToRooms(result._id)
    );
    console.log("ndsd");
    res.json(hotel);
  } catch {
    (err) => console.log(err);
  }
};
