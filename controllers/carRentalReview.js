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
    const newReviewEvent = await knexPg.from("car_rental_review");
    res.send(newReviewEvent);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================CREATE NEW REVIEW - POST ROUTE========================
router.post("/", async (req, res) => {
  try {
    const { rating, review, username, cars_id, event_id } = req.body;
    const newReviewEvent = await knexPg("car_rental_review").insert({
      rating: rating,
      review: review,
      username: username,
      cars_id: cars_id,
      event_id: event_id,
    });
    res.status(200).send(`User modified with cars_ID: ${event_id}`);
    console.log(newReviewEvent);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================GET A REVIEW - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await knexPg("car_rental_review").where("review_id", id);
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
  }
});

//!========================UPDATE A REVIEW - PUT ROUTE=========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { review_id, rating, review, username, cars_id, event_id } = req.body;
    const event = await knexPg("car_rental_review")
      .where("review_id", "=", id)
      .update({
        review_id: id,
        rating: rating,
        review: review,
        username: username,
        cars_id: cars_id,
        event_id: event_id,
      });
    res.status(200).send(`Event modified with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================DELETE A REVIEW - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await knexPg("car_rental_review")
      .where("review_id", id)
      .del();
    res.status(200).send(`Event deleted with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
