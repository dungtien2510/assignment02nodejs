const Transaction = require("../models/transaction");
const User = require("../models/user");
// post add transaction
exports.postAddTransaction = async (req, res, next) => {
  const transaction = new Transaction({
    user: req.body.user,
    hotel: req.body.hotel,
    rooms: req.body.rooms,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    price: req.body.price,
    payment: req.body.payment,
    status: req.body.status,
  });
  const user = await User.findOneAndUpdate(
    { _id: req.body.user.userId },
    {
      $set: {
        fullName: req.body.name,
        phoneNumber: req.body.phone,
        email: req.body.email,
        isAdmin: false,
      },
    }
  );
  transaction
    .save()
    .then((result) => {
      console.log("created transaction");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get transaction list
exports.getListTransactions = (req, res, next) => {
  const idUser = req.headers.authorization;
  Transaction.find({ "user.userId": idUser })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
};
