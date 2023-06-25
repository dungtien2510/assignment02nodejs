const { Error } = require("./error");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");
//get hotel as home
exports.getHotels = (req, res, next) => {
  Hotel.find()
    .exec()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

//get detail hotel
exports.getDetail = (req, res, next) => {
  Hotel.findById(req.query.id)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

//get search hotels
exports.getHotelSearch = async (req, res, next) => {
  try {
    const { city, dateStart, dateEnd, maxPeople, room } = req.query;

    // Tìm khách sạn theo thành phố
    const hotels = await Hotel.find({ city });

    // Lọc khách sạn có phòng trống trong khoảng thời gian
    const filteredHotels = await Promise.all(
      hotels.map(async (hotel) => {
        const rooms = await Room.find({ hotel }).select("_id");
        const roomIds = rooms.map((room) => room._id);

        // Kiểm tra xem khách sạn có đủ số phòng mong muốn không
        if (roomIds.length >= numRooms) {
          const transactions = await Transaction.find({
            hotel,
            rooms: { $in: roomIds },
            $or: [
              { dateStart: { $gte: dateEnd } },
              { dateEnd: { $lte: dateStart } },
            ],
          });

          // Khách sạn có phòng trống trong khoảng thời gian
          if (transactions.length === 0) {
            return hotel;
          }
        }
      })
    );

    // Trả về danh sách khách sạn thỏa mãn
    res.json(filteredHotels.filter(Boolean));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
