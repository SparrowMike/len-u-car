const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");
const knexPg = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.HEROKU_POSTGRESQL_URL,
    ssl: { rejectUnauthorized: false },
  },
});

//*=======================READ all cars - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    const existingCars = await knexPg.from("cars");
    res.send(existingCars);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================CREATE new car - POST ROUTE========================
router.post("/", async (req, res) => {
  try {
    const {
      brand,
      model,
      type,
      passenger_capacity,
      transmission,
      price_per_day,
      mileage,
      engine_type,
      key_features,
      key_rules,
      status,
      pick_up_point,
      username,
    } = req.body;
    const newCar = await knexPg("cars").insert({
      brand: brand,
      model: model,
      type: type,
      passenger_capacity: passenger_capacity,
      transmission: transmission,
      price_per_day: price_per_day,
      mileage: mileage,
      engine_type: engine_type,
      key_features: key_features,
      key_rules: key_rules,
      status: status,
      pick_up_point: pick_up_point,
      username: username,
    });
    res.status(200).send(`Car created with brand: ${brand}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================GET a car - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cars = await knexPg("cars").where("cars_id", id);
    res.status(200).json(cars[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//!========================UPDATE a car - PUT ROUTE========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      brand,
      model,
      type,
      passenger_capacity,
      transmission,
      price_per_day,
      mileage,
      engine_type,
      key_features,
      key_rules,
      status,
      pick_up_point,
      username, // previous was 'user_id'
    } = req.body;

    const car_rowCount = await knexPg("cars").where("cars_id", "=", id).update({
      cars_id: id,
      brand: brand,
      model: model,
      type: type,
      passenger_capacity: passenger_capacity,
      transmission: transmission,
      price_per_day: price_per_day,
      mileage: mileage,
      engine_type: engine_type,
      key_features: key_features,
      key_rules: key_rules,
      status: status,
      pick_up_point: pick_up_point,
      username: username,
    });

    res.status(200).send(`Car modified with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================DELETE a car - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = knexPg("cars")
      .where("cars_id", id)
      .del()
      .then(() => {
        knexPg.destroy();
      });

    res.status(200).send(`Car deleted with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
