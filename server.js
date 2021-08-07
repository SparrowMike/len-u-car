//! BASED ON ======> https://www.youtube.com/watch?v=ldYcgPKEZC8

//*=====================DEPENDENCIES=====================
const express = require("express");
const app = express();
const cors = require("cors");

//*===================CONFIGURATIONS======================
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//* ==============BODY PARSER, MIDDLEWARE====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//*=================CONTROLLERS/ROUTES====================

const usersController = require("./controllers/users");
const carsController = require("./controllers/cars");
app.use("/users", usersController);
app.use("/cars", carsController);

//*==================LISTENER=====================
app.listen(PORT, () => {
  console.log("Car rental has started on port", PORT);
});
