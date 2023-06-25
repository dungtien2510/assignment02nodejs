const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
// userSchema.methods.addToTransaction = function (hotel) {
//   const hotelIndex = this.transaction.findIndex((cp)=>{
//     return cp.hotelId.toString() ==
//   });
// };
