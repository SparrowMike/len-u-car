const express = require("express");
const router = express.Router();
const pool = require("../db");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

//*========================CREATE new car image - POST ROUTE========================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result.secure_url;
    const cloudinary_id = result.public_id;
    // const { image, cloudinary_id } = req.body;
    const newCarImage = await pool.query(
      "INSERT INTO car_images (image,cloudinary_id) VALUES ($1,$2)",
      [image, cloudinary_id]
    );
    res.status(200).send(`Car image uploaded: ${image}`);
  } catch (error) {
    console.log(error.message);
  }
});

//*========================GET a car image - GET ROUTE=======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carX = await pool.query("SELECT * FROM cars WHERE cars_id = $1", [
      id,
    ]);
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
