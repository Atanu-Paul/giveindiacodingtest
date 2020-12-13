//setting up the Router module form the express package
const express = require("express");
const router = express.Router();

//importing and mounting all the controller methods to the routes
const { welcome, listAllAccounts, transferMoney } = require("../controller");

//defining all the routes
router.get("/", welcome);
router.get("/accounts/list", listAllAccounts);
router.post("/transfer", transferMoney);

//exporting the router
module.exports = router;
