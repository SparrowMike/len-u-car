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

//*========================READ ALL IMAGES - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    const carImages = await knexPg.from("car_images");
    res.send(carImages);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================GET a car image - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cars = await knexPg("car_images").where("images_id", id);
    res.status(200).json(cars[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//*=====================UPDATE THE IMAGE=========================
router.put("/:id", upload.single("secure_url"), async (req, res) => {
  try {
    const { id } = req.params;
    const fileStr = req.body.avatar; // not tested yet
    const carImages = await pool.query(
      "SELECT secure_url, cloudinary_id FROM car_images WHERE images_id = $1",
      [id]
    );
    console.log(carImages);

    let result;
    let secure_url;
    let cloudinary_id;
    const cloudID = carImages.rows[0].cloudinary_id;
    const cloudImage = carImages.rows[0].secure_url;
    if (fileStr) {
      // previous req.file
      await cloudinary.uploader.destroy(cloudID);
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "carImages",
      });
    }
    if (result === undefined) {
      secure_url = cloudImage;
      cloudinary_id = cloudID;
    } else {
      secure_url = result.secure_url;
      cloudinary_id = result.public_id;
    }

    const { cars_id } = req.body;
    const carImage = await knexPg("users").where("user_id", "=", id).update({
      images_id: id,
      secure_url: secure_url,
      cloudinary_id: cloudinary_id,
      cars_id: cars_id,
    });
    res.status(200).send(`Car image modified with ID: ${id}`);
  } catch (err) {
    console.log(err);
  }
});

//*========================DELETE a car image - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const carData = await knexPg("car_images") // not tested yet
      .where("images_id", id)
      .select("cloudinary_id");
    const cloudID = carData.rows[0].cloudinary_id;
    await cloudinary.uploader.destroy(cloudID);

    const carImageX = knexPg("car_images")
      .where("images_id", id)
      .del()
      .then(() => {
        knexPg.destroy();
      });
    res.status(200).send(`Car image with ID: ${id} deleted`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
