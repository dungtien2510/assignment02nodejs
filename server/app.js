const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./router/auth");
const hotel = require("./router/hotels");
const admin = require("./router/admin");
const rooms = require("./router/rooms");
const transactions = require("./router/transaction");

app.use(cors());
// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//mongoose
const mongoose = require("mongoose");

//user

// authentication
app.use("/auth", auth);

// hotel
app.use("/hotels", hotel);
// admin
app.use("/admin", admin);

// rooms
app.use("/rooms", rooms);

//transaction
app.use("/transactions", transactions);

// error
app.use((error, req, res, next) => {
  const status = error.status;
  const message = error.message;
  res.status(status).json({ message: message, status: status });
});

//connect mongoose
mongoose
  .connect(
    "mongodb+srv://dungtien2510:Dung25101997@cluster0.3uppexw.mongodb.net/booking?retryWrites=true&w=majority"
  )
  .then((result) => app.listen(5000))
  .catch((error) => console.log(error));
