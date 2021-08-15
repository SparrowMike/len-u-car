const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");

//*=======================READ all cars - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    const existingCars = await pool.query("SELECT * FROM cars;");
    res.send(existingCars.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================GREATE NEW FORM - GET ROUTE========================
router.get("/new", async (req, res) => {
  res.send("send this to CRA");
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
      user_id,
    } = req.body;
    const newCar = await pool.query(
      "INSERT INTO cars (brand, model, type, passenger_capacity, transmission, price_per_day, mileage, engine_type, key_features, key_rules,status,pick_up_point,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [
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
        user_id,
      ]
    );
    res.status(200).send(`Car created with brand: ${brand}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================GET a car - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carX = await pool.query("SELECT * FROM cars WHERE cars_id = $1", [
      id,
    ]);
    //   res.json(userX.rows[0])
    res.status(200).json(carX.rows);
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
      username,   // previous was 'user_id'
    } = req.body;
    const carX = await pool.query(
      "UPDATE cars SET brand = $2, model = $3, type = $4, passenger_capacity = $5, transmission = $6, price_per_day = $7, mileage = $8, engine_type = $9, key_features = $10,key_rules = $11,status= $12,pick_up_point = $13,username = $14 WHERE cars_id = $1",
      [
        id,
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
        username,   // previous was 'user_id'
      ]
    );
    res.status(200).send(`Car modified with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================DELETE a car - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carX = await pool.query("DELETE FROM cars WHERE cars_id = $1", [id]);

    res.status(200).send(`Car deleted with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
