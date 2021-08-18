const express = require("express");
const router = express.Router();
const knexPg = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.HEROKU_POSTGRESQL_URL,
    ssl: { rejectUnauthorized: false },
  },
});

//*========================READ ALL EVENT - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    console.log("carRentalEvent triggered");
    const carRentalEvent = await knexPg.from("car_rental_event");
    res.send(carRentalEvent);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================CREATE NEW EVENT - POST ROUTE========================
router.post("/", async (req, res) => {
  try {
    const { day, month, year, username, cars_id } = req.body;
    const newRentalEvent = await knexPg("car_rental_event").insert({
      day: day,
      month: month,
      year: year,
      username: username,
      cars_id: cars_id,
    });
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
    const events = await knexPg("car_rental_event").where("cars_id", id);
    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
  }
});

// //*========================UPDATE A EVENT - PUT ROUTE=========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { day, month, year, cars_id } = req.body;
    const carRentalEvent_rowCount = await knexPg("car_rental_event")
      .where("event_id", "=", id)
      .update({
        event_id: id,
        day: day,
        month: month,
        year: year,
        cars_id: cars_id,
      });
    res.status(200).send(`Event modified with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================DELETE A EVENT - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await knexPg("car_rental_event").where("event_id", id).del();
    res.status(200).send(`Event deleted with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
