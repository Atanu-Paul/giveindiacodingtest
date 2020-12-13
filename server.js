//importing all the required packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

//importing all the routes
const appRoutes = require("./routes");

//connecting the mongodb atlas cluster to the api
const connectDB = require("./database_conn");
connectDB();

//initilizing the server
const server = express();

//setting up all the middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan("dev"));

//mounting all the routes on the server
server.use(appRoutes);

//declaring the port number
const port = process.env.PORT || 8000;

//setting up the server to listin on the port number
server.listen(port, () => {
  console.log(`Express server is listing on port number ${port}`);
});
