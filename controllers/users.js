const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

//*========================READ ALL USERS - GET ROUTE========================

router.get("/", async (req, res) => {
  try {
    const users = await knexPg
      .from("users")
      .innerJoin("cars", "users.username", "cars.username")
      .leftJoin("car_images", "car_images.cars_id", "cars.cars_id")
      .orderBy("users.username");

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================CREATE NEW USERS - POST ROUTE========================

router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    const { username, password, full_name, email } = req.body;
    const newUser = await knexPg("users").insert({
      username: username,
      password: password,
      full_name: full_name,
      email: email,
    });
    res.json({
      msg: "database insert new user successful",
      rowCount: newUser.rowCount,
    });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================check username exists=======================

router.post("/checkusers", async (req, res) => {
  try {
    const existingUsers = await knexPg("users")
      .where("username", req.body.username)
      .then((users) => {
        if (users.length !== 0 && users[0].username) {
          return res.json({ msg: "Username already been taken" });
        }
        return res.json({ msg: "Username available." });
      });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================check email exists=======================

router.post("/checkemail", async (req, res) => {
  try {
    const existingUsers = await knexPg("users")
      .where("email", req.body.email)
      .then((users) => {
        if (users.length !== 0 && users[0].email) {
          return res.json({ msg: "Email already been taken" });
        }
        return res.json({ msg: "Email available." });
      });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================GET A USER - GET ROUTE=======================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await knexPg("users").where("user_id", id);
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================UPDATE a user - PUT ROUTE=======================

router.put("/:id", async (req, res) => {
  console.log("req.body avatar - " + req.body.avatar + "req.body avatar - ");
  try {
    const { id } = req.params;
    const fileStr = req.body.avatar; // not tested yet
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

    const user_rowCount = await knexPg("users")
      .where("user_id", "=", id)
      .update({
        user_id: id,
        username: username,
        password: password,
        full_name: full_name,
        email: email,
        // avatar: avatar,
        user_type: user_type,
        mobile: mobile,
        identification_card: identification_card,
        driving_license: driving_license,
        // cloudinary_id: cloudinary_id,
      });

    res.status(200).send(`User modified with ID: ${id}`);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================DELETE a user - DELETE ROUTE========================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userAvatar = await knexPg("users") // not tested yet
      .where("user_id", id)
      .select("cloudinary_id");

    const cloudID = userAvatar[0].cloudinary_id;
    await cloudinary.uploader.destroy(cloudID);

    const result = knexPg("users")
      .where("user_id", id)
      .del()
      .then(() => {
        knexPg.destroy();
      });
    res.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
