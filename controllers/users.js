const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");
const bcrypt = require("bcrypt");

// Routes

//*========================READ ALL USERS - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    const existingUsers = await pool.query("SELECT * FROM users;");
    res.send(existingUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================CREATE NEW USERS - POST ROUTE========================
router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    const { username, password_unhashed, full_name, email } = req.body;

    // hash plaintext password
    console.log(username);
    console.log(password_unhashed);
    password = bcrypt.hashSync(password_unhashed, bcrypt.genSaltSync(10));
    console.log(password);

    const newUser = await pool.query(
      "INSERT INTO users (username, password, full_name, email) VALUES ($1,$2,$3,$4)",
      [username, password, full_name, email]
    );
    res.json(newUser.rows[0]);
    console.log(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================check username exists=======================

router.post("/checkusers", async (req, res) => {
  try {
    // console.log( " checkusers route triggered")

    const existingUsers = await pool
      .query("SELECT * FROM users WHERE username = $1", [req.body.username])
      .then((user) => {
        // console.log(user.rowCount);

        if (user.rowCount) {
          console.log({ msg: "Username already been taken" });
          return res.json({ msg: "Username already been taken" });
        }

        console.log({ msg: "Username available." });
        return res.json({ msg: "Username available." });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json("Error: " + error);
  }
});

//*========================check email exists=======================

router.post("/checkemail", async (req, res) => {
  // console.log( " check_EMAIL route triggered")

  try {
    const existingUsers = await pool
      .query("SELECT * FROM users WHERE email = $1", [req.body.email])
      .then((email) => {
        if (email.rowCount) {
          console.log({ msg: "Email address is in use." });
          return res.json({ msg: "Email address is in use." });
        }
        console.log({ msg: "Email address is available." });
        return res.json({ msg: "Email address is available." });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json("Error: " + error);
  }
});

//*========================GET A USER - GET ROUTE=======================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userX = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    //   res.json(userX.rows[0])
    res.status(200).json(userX.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================UPDATE a user - PUT ROUTE=======================
router.put("/:id", async (req, res) => {
  console.log("req.body avatar - " + req.body.avatar + "req.body avatar - ");
  try {
    const { id } = req.params;
    const fileStr = req.body.avatar;
    const userAvatar = await pool.query(
      "SELECT cloudinary_id, avatar FROM users WHERE user_id = $1",
      [id]
    );

    let result;
    let avatar;
    let cloudinary_id;
    const cloudID = userAvatar.rows[0].cloudinary_id;
    const cloudAvatar = userAvatar.rows[0].avatar;
    if (fileStr) {
      await cloudinary.uploader.destroy(cloudID);
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "userAvatar",
      });
    }
    if (result === undefined) {
      avatar = cloudAvatar;
      cloudinary_id = cloudID;
    } else {
      avatar = result.secure_url;
      cloudinary_id = result.public_id;
    }

    const {
      username,
      password,
      full_name,
      email,
      user_type,
      mobile,
      identification_card,
      driving_license,
    } = req.body;
    const userX = await pool.query(
      "UPDATE users SET username = $2, password = $3, full_name = $4, email = $5, avatar = $6, user_type = $7, mobile = $8, identification_card = $9, driving_license = $10, cloudinary_id = $11 WHERE user_id = $1",
      [
        id,
        username,
        password,
        full_name,
        email,
        avatar,
        user_type,
        mobile,
        identification_card,
        driving_license,
        cloudinary_id,
      ]
      // "UPDATE users SET username = $2, password = $3, full_name = $4, email = $5, user_type = $6, mobile = $7, identification_card = $8, driving_license = $9 WHERE user_id = $1",
      // [
      //   id,
      //   username,
      //   password,
      //   full_name,
      //   email,
      //   user_type,
      //   mobile,
      //   identification_card,
      //   driving_license
      // ]
    );
    res.status(200).send(`User modified with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================DELETE a user - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userAvatar = await pool.query(
      "SELECT cloudinary_id FROM users WHERE user_id = $1",
      [id]
    );
    const cloudID = userAvatar.rows[0].cloudinary_id;
    await cloudinary.uploader.destroy(cloudID);
    const userX = await pool.query("DELETE FROM users WHERE user_id = $1", [
      id,
    ]);
    res.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
