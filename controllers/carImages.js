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

//*========================GET car images - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cars = await knexPg("car_images").where("images_id", id);
    res.status(200).json(cars[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================POST a car image - POST ROUTE=======================
router.post("/", upload.single("secure_url"), async (req, res) => {
  try {
    const fileStr = req.body.secure_url; // not tested yet
    let result;
    let secure_url;
    let cloudinary_id;

    if (fileStr) {
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "carImages",
      });
      secure_url = result.secure_url;
      cloudinary_id = result.public_id;
    } else {
      secure_url = "";
      cloudinary_id = "";
    }

    console.log("Avatar :", avatar);
    console.log("cloudinary_id :", cloudinary_id);

    const { cars_id } = req.body;

    const carImage = await knexPg("car_images").insert({
      secure_url: secure_url,
      cloudinary_id: cloudinary_id,
      cars_id: cars_id,
    });
    res.json({
      msg: "database insert new car image successful",
      rowCount: carImage.rowCount,
    });
  } catch (error) {
    res.status(400).json("Error: " + error);
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
    console.log("this is carImages: ", carImages);

    if (fileStr && cloudID !== null) {
      await cloudinary.uploader.destroy(cloudID);
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "carImages",
      });
      secure_url = result.secure_url;
      cloudinary_id = result.public_id;
    } else if (fileStr && cloudID === null) {
      result = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "carImages",
      });
      secure_url = result.secure_url;
      cloudinary_id = result.public_id;
    } else {
      secure_url = "";
      cloudinary_id = "";
    }

    console.log("Avatar :", avatar);
    console.log("cloudinary_id :", cloudinary_id);

    const { cars_id } = req.body;
    const carImage = await knexPg("car_images")
      .where("images_id", "=", id)
      .update({
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
