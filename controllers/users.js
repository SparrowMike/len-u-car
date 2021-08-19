const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");
const knexPg = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.HEROKU_POSTGRESQL_URL,
    ssl: { rejectUnauthorized: false },
  },
});

//*========================READ ALL USERS - GET ROUTE========================

router.get("/random", async (req, res) => {
  try {
    const users = await knexPg
      .from("users")
      .innerJoin("cars", "users.username", "cars.username")
      .leftJoin("car_images", "car_images.cars_id", "cars.cars_id")
      .orderByRaw("RANDOM()")
      .limit(6);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/randomSlick", async (req, res) => {
  try {
    const users = await knexPg
      .from("users")
      .innerJoin("cars", "users.username", "cars.username")
      .leftJoin("car_images", "car_images.cars_id", "cars.cars_id")
      .select(
        "cars.cars_id",
        "cars.price_per_day",
        "cars.brand",
        "cars.model",
        "car_images.secure_url"
      )
      .orderByRaw("RANDOM()")
      .limit(3);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//*========================READ RANDOM 3 USERS - GET ROUTE========================

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
    const { username, password_unhashed, full_name, email } = req.body;
    const password = bcrypt.hashSync(password_unhashed, bcrypt.genSaltSync(10));
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
    const existingUsers = await pool
      .query("SELECT * FROM users WHERE username = $1", [req.body.username])
      .then((user) => {
        if (user.rowCount) {
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
    const existingUsers = await pool
      .query("SELECT * FROM users WHERE email = $1", [req.body.email])
      .then((email) => {
        if (email.rowCount) {
          return res.json({ msg: "Email address is in use." });
        }
        return res.json({ msg: "Email address is available." });
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
  // console.log("req.body avatar - " + req.body.avatar + "req.body avatar - ");
  try {
    const { id } = req.params;
    const fileStr = req.body.avatar; // not tested yet
    const userAvatar = await pool.query(
      "SELECT cloudinary_id, avatar FROM users WHERE user_id = $1",
      [id]
    );

    console.log(fileStr);

    let result;
    let avatar;
    let cloudinary_id;
    const cloudID = userAvatar.rows[0].cloudinary_id;
    console.log("this is userAvatar: ", userAvatar);

    if (fileStr && cloudID !== null) {
      await cloudinary.uploader.destroy(cloudID);
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "userAvatar",
      });
      avatar = result.secure_url;
      cloudinary_id = result.public_id;
    } else if (fileStr && cloudID === null) {
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "userAvatar",
      });
      avatar = result.secure_url;
      cloudinary_id = result.public_id;
    } else {
      avatar = "";
      cloudinary_id = "";
    }

    console.log("Avatar :", avatar);
    console.log("cloudinary_id :", cloudinary_id);

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

    console.log(req.body);

    const user_rowCount = await knexPg("users")
      .where("user_id", "=", id)
      .update({
        user_id: id,
        username: username,
        password: password,
        full_name: full_name,
        email: email,
        avatar: avatar,
        user_type: user_type,
        mobile: mobile,
        identification_card: identification_card,
        driving_license: driving_license,
        cloudinary_id: cloudinary_id,
      });

    console.log(user_rowCount);

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
    const cloudID = userAvatar[0].cloudinary_id || null;
    await cloudinary.uploader.destroy(cloudID);

    const result = await knexPg("users").where("user_id", id).del();

    res.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
