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
    res.status(400).json("Error: " + error);
  }
});

//*========================CREATE NEW REVIEW - POST ROUTE========================
router.post("/", async (req, res) => {
  try {
    console.log("car review post");
    const { rating, review, username, cars_id, event_id } = req.body;
    const newReviewEvent = await knexPg("car_rental_review").insert({
      rating: rating,
      review: review,
      username: username,
      cars_id: cars_id,
      event_id: event_id,
    });
    res.status(200).send(`User modified with cars_ID: ${cars_id}`);
    console.log(newReviewEvent);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================GET REVIEWS - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await knexPg("car_rental_review").where("cars_id", id); // changed from review_id to cars_id
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Error: " + error);
  }
});

//*========================GET REVIEWS WITH RENTAL HISTORY - GET ROUTE========================

router.get("/join/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await knexPg
      .from("car_rental_review")
      .innerJoin(
        "car_rental_event",
        "car_rental_event.event_id",
        "car_rental_review.event_id"
      )
      .where("car_rental_event.cars_id", "=", id);

    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Error: " + error);
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
    res.status(400).json("Error: " + error);
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
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
