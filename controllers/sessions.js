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
    
        const existingUsers = await pool
          .query("SELECT * FROM users WHERE username = $1", [req.body.username])
          .then((foundUsers) => {
            console.log(foundUsers.rowCount);
    
            if (foundUsers.rowCount) {
              console.log({ msg: "Username exist" });
              
              if (bcrypt.compareSync(req.body.password, foundUsers.rows[0].password)) {
                console.log( foundUsers.rows[0].username )

                req.session.currentUser = foundUsers.rows[0].username;
                console.log("log in user", req.session.currentUser);
                return res.json(req.session);
              }
              else {
                console.log({ msg: "Username exist, but password wrong" });
                return res.json({ msg: "Username exist, but password wrong" });
              }

            } else {
                console.log({ msg: "Username don't exist" });
                return res.json({ msg: "Username don't exist" });
            }
          });

      } catch (error) {
        console.error(error);
        res.status(400).json("Error at session login: " + error);
      }
  });


// logout
router.delete("/", (req, res) => {

    const sid_destroy = req.sessionID;

    req.session.destroy(() => {
      redisClient.del(sid_destroy, function(err) {
        console.log("redis server delete session error")
      });
      res.send("user has logged out");
    });

});


// EXPORT
module.exports = router;