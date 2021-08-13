const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db");

const redisClient = require("../server.js");   // correct?


// test (can remove)
router.get("/", (req, res) => {
    res.send("session route GET")
});


// login
router.post("/", async (req, res) => {
    try {
        console.log( " session login route triggered")
        // console.log("req body: ", req.body);
        // req.session.sid = `sess:${req.sessionID}`;
        // console.log( req.session.sid );
    
        const existingUsers = pool
          .query("SELECT * FROM users WHERE username = $1", [req.body.username])
          .then((foundUsers) => {
            console.log(foundUsers.rowCount);
    
            if (foundUsers.rowCount) {
              console.log({ msg: "Username exist" });
              
              if (bcrypt.compareSync(req.body.password, foundUsers.rows[0].password)) {
                console.log( foundUsers.rows[0].username );
                req.session.currentUser = foundUsers.rows[0];

                console.log("log in user", req.session.currentUser);
                // return res.json(req.session);
              }
              else {
                console.log( bcrypt.hashSync( req.body.password , bcrypt.genSaltSync(10)) );

                console.log({ msg: "Username exist, but password wrong" });
                return res.json({ msg: "Username exist, but password wrong" });
              }

            } else {
                console.log({ msg: "Username don't exist" });
                return res.json({ msg: "Username don't exist" });
            }
          })
          .then( ()=>{
              const existingCars = pool
              .query("SELECT * FROM cars WHERE username = $1", [req.body.username])
              .then((foundCars) => {
                console.log(req.body.username);
                req.session.currentUserCars = foundCars.rows[0];

                return res.json(req.session);
              });
          });

      } catch (error) {
        console.error(error);
        res.status(400).json("Error at session login: " + error);
      }
  });


// check login
router.get("/check", (req, res) => {
  if (req.session === undefined) {
    res.send("not logged in");
  } else {
    const sid_get = `sess:${req.sessionID}`;
    redisClient.get(sid_get, async (err, jobs) => {
      if (err) {
        console.log("redis server cannot retrieve session not successful")
      } else {
        if (jobs) {
          res.status(200).json({
              jobs: JSON.parse(jobs),
              message: "data retrieved from the cache"
          });
        }
      }
    });
  }
});


// logout
router.delete("/", (req, res) => {

    // const sid_destroy = req.sessionID;
    const sid_destroy = `sess:${req.sessionID}`;

    req.session.destroy(() => {
      redisClient.del(sid_destroy, function(err) {
        console.log("redis server delete session error")
      });
      res.send("user has logged out");
    });

});


// EXPORT
module.exports = router;