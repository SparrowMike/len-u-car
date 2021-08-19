const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db");

const redisClient = require("../server.js");

// login
router.post("/", (req, res) => {
  try {
    console.log("session login(POST) route triggered");
    const existingUsers = pool
      .query("SELECT * FROM users WHERE username = $1", [req.body.username])
      .then((foundUsers) => {
        console.log("foundUsers", foundUsers);
        if (foundUsers.rowCount) {
          if (
            bcrypt.compareSync(req.body.password, foundUsers.rows[0].password)
          ) {
            // store user's profile details in session
            req.session.currentUser = foundUsers.rows[0];
          } else {
            console.log("Username exist, but password wrong");
            return res.json({ msg: "Username exist, but password wrong" });
          }
        } else {
          console.log("Username don't exist");
          return res.json({ msg: "Username don't exist" });
        }
      })
      .then(() => {
        const existingCars = pool
          .query("SELECT * FROM cars WHERE username = $1", [req.body.username])
          .then((foundCars) => {
            req.session.currentUserCars = foundCars.rows;
            console.log("found cars row ", foundCars.rows);
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
    // console.error(error);
    console.log("Error at session login: " + error);
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

    redisClient.exists(sid_get, (err, ok) => {
      if (err) throw err;

      console.log("ok: ", ok);
      if (ok) {
        // if session key exist in Redis server
        redisClient.get(sid_get, async (err, jobs) => {
          if (err) {
            res.json({
              message: "Retrieve session data from Redis server not successful",
            });
          } else {
            if (jobs) {
              res.status(200).json({
                sessionDetails: JSON.parse(jobs),
                msg: "Retrieved session data from Redis server.",
                session_exist: "true",
              });
            }
          }
        });
      } else {
        // if session key DON't exist in Redis server
        res.status(400).json({
          msg: "session key don't exist in Redis server",
          session_exist: "false",
        });
      }
    });

    // redisClient.get(sid_get, async (err, jobs) => {
    //   if (err) {
    //     res.json({
    //       message: "Retrieve session data from Redis server not successful",
    //     });
    //   } else {
    //     if (jobs) {
    //       res.status(200).json({
    //         sessionDetails: JSON.parse(jobs),
    //         message: "Retrieved session data from Redis server.",
    //       });
    //     }
    //   }
    // });
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
