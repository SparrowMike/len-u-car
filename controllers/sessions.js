const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db");

const redisClient = require("../server.js");

// login
router.post("/", async (req, res) => {
  try {
    const existingUsers = pool
      .query("SELECT * FROM users WHERE username = $1", [req.body.username])
      .then((foundUsers) => {
        if (foundUsers.rowCount) {
          if (
            bcrypt.compareSync(req.body.password, foundUsers.rows[0].password)
          ) {
            // store user's profile details in session
            req.session.currentUser = foundUsers.rows[0];
          } else {
            return res.json({ msg: "Username exist, but password wrong" });
          }
        } else {
          return res.json({ msg: "Username don't exist" });
        }
      })
      .then(() => {
        const existingCars = pool
          .query("SELECT * FROM cars WHERE username = $1", [req.body.username])
          .then((foundCars) => {
            req.session.currentUserCars = foundCars.rows;

            // if car information is retrieved from database, update car details into session
            if (req.session.currentUser !== undefined) {
              // store car (user's) details in session
              req.session.currentSID = req.sessionID;
              return res.json({ currentSID: req.session.currentSID });
            }
          });
      });
  } catch (error) {
    // console.error(error);
    res.status(400).json("Error at session login: " + error);
  }
});

// check login
router.get("/check/:sid", (req, res) => {
  const { sid } = req.params;

  if (req.session === undefined) {
    res.send("not logged in");
  } else {
    const sid_get = `sess:${sid}`;

    redisClient.get(sid_get, async (err, jobs) => {
      if (err) {
        res.json({
          message: "Retrieve session data from Redis server not successful",
        });
      } else {
        if (jobs) {
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
