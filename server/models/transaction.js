const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    userName: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  hotel: {
    id: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Hotel",
    },
    hotelName: {
      type: String,
      require: true,
    },
  },
  rooms: [
    {
      id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Room",
      },
      roomNumbers: { type: Array, require: true },
    },
  ],
  dateStart: { type: String, require: true },
  dateEnd: { type: String, require: true },
  price: { type: Number, require: true },
  payment: { type: String, require: true },
  status: { type: String, require: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);

// transactionSchema.methods.addToTransactions = funtion(transaction){
//   const transactionHotelIndex = this.hotel.findIndex((item)=>{
//     return item.id.toString() === transaction.hotel
//   })
//   if(transactionHotelIndex >=0){
//     newRooms
//   }
// }
