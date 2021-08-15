const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db");

const redisClient = require("../server.js");

// login
router.post("/", async (req, res) => {
  try {
    console.log(" session login route triggered");

    const existingUsers = pool
      .query("SELECT * FROM users WHERE username = $1", [req.body.username])
      .then((foundUsers) => {
        console.log(foundUsers.rowCount);

        if (foundUsers.rowCount) {
          console.log({ msg: "Username exist" });

          if (
            bcrypt.compareSync(req.body.password, foundUsers.rows[0].password)
          ) {
            console.log(foundUsers.rows[0].username);

            // store user's profile details in session
            req.session.currentUser = foundUsers.rows[0];
            console.log("log in user", req.session.currentUser);
          } else {
            console.log(
              bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            );

            console.log({ msg: "Username exist, but password wrong" });
            return res.json({ msg: "Username exist, but password wrong" });
          }
        } else {
          console.log({ msg: "Username don't exist" });
          return res.json({ msg: "Username don't exist" });
        }
      })
      .then(() => {
        const existingCars = pool
          .query("SELECT * FROM cars WHERE username = $1", [req.body.username])
          .then((foundCars) => {
            console.log(req.body.username);
            req.session.currentUserCars = foundCars.rows; // can have more than one car

            console.log("req.session.currentUserCars: ", foundCars.rows);

            // if car information is retrieved from database, update car details into session
            if (req.session.currentUser !== undefined) {
              // store car (user's) details in session
              req.session.currentSID = req.sessionID;
              console.log("req.session.currentSID: ", req.session.currentSID);

              return res.json({ currentSID: req.session.currentSID });
            }
          });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json("Error at session login: " + error);
  }
});

// check login
router.get("/check/:sid", (req, res) => {
  const { sid } = req.params;
  console.log("session id");
  console.log(sid);

  console.log("session check route triggered");

  if (req.session === undefined) {
    res.send("not logged in");
  } else {
    const sid_get = `sess:${sid}`;
    console.log(sid_get);

    redisClient.get(sid_get, async (err, jobs) => {
      if (err) {
        console.log("Retrieve session data from Redis server not successful");
        res.json({
          message: "Retrieve session data from Redis server not successful",
        });
      } else {
        if (jobs) {
          console.log("Retrieve session data from Redis server successful");
          console.log(JSON.parse(jobs));

          res.status(200).json({
            sessionDetails: JSON.parse(jobs),
            message: "Retrieved session data from Redis server.",
          });
        }
      }
    });
  }
});

// logout
router.delete("/:sid", (req, res) => {
  const { sid } = req.params;
  console.log("session id");
  console.log(sid);
  const sid_destroy = `sess:${sid}`;

  req.session.destroy(() => {
    redisClient.del(sid_destroy, function (err) {
      console.log(`redis server session deleted: ${sid_destroy}`);
    });
    res.send("user has logged out");
  });
});

// EXPORT
module.exports = router;
