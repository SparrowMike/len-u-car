const express = require("express");
const router = express.Router();
const pool = require("../db");

//*========================READ ALL EVENT - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    const carRentalEvent = await pool.query("SELECT * FROM car_rental_event;");
    res.send(carRentalEvent.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================CREATE NEW EVENT - POST ROUTE========================
router.post("/", async (req, res) => {
  try {
    const { day, month, year, username, cars_id } = req.body;
    const newRentalEvent = await pool.query(
      "INSERT INTO car_rental_event (day, month, year,username , cars_id ) VALUES ($1,$2,$3,$4,$5)",
      [day, month, year, username, cars_id]
    );
    res.status(200).send(`User modified with cars_ID: ${cars_id}`);
    // res.json(newRentalEvent);
    console.log(newRentalEvent);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

//*========================GET A EVENT - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await pool.query(
      "SELECT * FROM car_rental_event WHERE cars_id = $1",
      [id]
    );
    //   res.json(event.rows[0])
    res.status(200).json(event.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// //*========================UPDATE A EVENT - PUT ROUTE=========================
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { day, month, year, cars_id } = req.body;
//     const event = await pool.query(
//       "UPDATE car_rental_event SET day = $2, month = $3, year = $4, cars_id = $5 WHERE event_id = $1",
//       [id, day, month, year, cars_id]
//     );
//     res.status(200).send(`Event modified with ID: ${id}`);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

//*========================DELETE A EVENT - DELETE ROUTE========================
router.delete("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await pool.query(
      "DELETE FROM car_rental_event WHERE cars_id = $1",
      [id]
    );
    res.status(200).send(`Event deleted with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
