const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

//*========================READ ALL IMAGES - GET ROUTE========================
router.get("/", async (req, res) => {
  try {
    const carImage = await pool.query("SELECT * FROM car_images;");
    res.send(carImage.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================CREATE new car image - POST ROUTE========================
router.post("/", upload.single("secure_url"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const secure_url = result.secure_url;
    const cloudinary_id = result.public_id;

    const newCarImage = await pool.query(
      "INSERT INTO car_images (secure_url,cloudinary_id) VALUES ($1,$2)",
      [secure_url, cloudinary_id]
    );
    res.status(200).send(`Car image uploaded: ${secure_url}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================GET a car image - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carX = await pool.query(
      "SELECT * FROM car_images WHERE images_id = $1",
      [id]
    );
    //   res.json(userX.rows[0])
    res.status(200).json(carX.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//!=====================UPDATE THE IMAGE========================= TBC
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    await cloudinary.uploader.destroy(post.cloudinary_id);
    const carData = await pool.query(
      "SELECT cloudinary_id FROM car_images WHERE images_id = $1",
      [id]
    );

    const carX = await pool.query(
      "UPDATE car_images SET cloudinary_id = $2, secure_url = $3, cars_id = $4 WHERE images_id = $1",
      [id]
    );
    //   res.json(userX.rows[0])
    res.status(200).json(carX.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================DELETE a car image - DELETE ROUTE========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carData = await pool.query(
      "SELECT cloudinary_id FROM car_images WHERE images_id = $1",
      [id]
    );
    const cloudID = carData.rows[0].cloudinary_id;
    await cloudinary.uploader.destroy(cloudID);
    const carImageX = await pool.query(
      "DELETE FROM car_images WHERE images_id = $1",
      [id]
    );
    res.status(200).send(`Car image with ID: ${id} deleted`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
