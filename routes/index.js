//setting up the Router module form the express package
const express = require("express");
const router = express.Router();

//importing and mounting all the controller methods to the routes
const { welcome } = require("../controller");

//defining all the routes
router.get("/", welcome);

//exporting the router
module.exports = router;
