const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  cheapestPrice: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  distance: {
    type: Number,
    require: true,
  },
  photos: {
    type: Array,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  featured: {
    type: Boolean,
    require: true,
  },
  rooms: [{ type: Schema.Types.ObjectId, require: true, ref: "Room" }],
});

hotelSchema.methods.addToRooms = function (roomId) {
  const isRooms = this.rooms.some((id) => String(id) === String(roomId));
  console.log(isRooms);
  if (!isRooms) {
    this.rooms.push(roomId);
    return this.save();
  }
};

//detele room
hotelSchema.methods.deleteToRoom = function (roomId) {
  const indexRoom = this.rooms.findIndex((i) => String(i) === String(roomId));
  if (indexRoom >= 0) {
    const a1 = this.rooms.slice(0, indexRoom);
    const a2 = this.rooms.slice(indexRoom + 1, this.rooms.length);
    this.rooms = [...a1, ...a2];
    return this.save();
  }
};

module.exports = mongoose.model("Hotel", hotelSchema);
