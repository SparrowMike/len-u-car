//*=====================DEPENDENCIES=====================
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//*===================CONFIGURATIONS======================
require("dotenv").config();
const PORT = process.env.PORT;

//* ==============BODY PARSER, MIDDLEWARE====================
app.use(cors());
app.use(express.json());

//*=================CONTROLLERS/ROUTES====================

const usersController = require("./controllers/users");
const carsController = require("./controllers/cars");
app.use("/users", usersController);
app.use("/cars", carsController);

//*==================LISTENER=====================
app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});
