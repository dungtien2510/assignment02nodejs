const express = require("express");
const router = express.Router();

const transactionController = require("../controller/transactions");

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

//post transaction
router.post("/add", transactionController.postAddTransaction);

//get transaction
router.get("/list", transactionController.getListTransactions);

module.exports = router;
