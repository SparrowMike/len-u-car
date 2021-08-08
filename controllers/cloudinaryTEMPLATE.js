const router = require("express").Router();
const { cloudinary } = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const Posts = require("../../models/posts");

//*=================UPLOAD A SINGLE IMAGE========================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    console.log("results", result);
    // Create new post
    let post = new Posts({
      image_url: result.secure_url,
      review: req.body.review,
      rating: req.body.rating,
      cloudinary_id: result.public_id,
      dishes_id: req.body.dishes_id,
    });
    // Save post
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

//*=======================SHOW ALL THE POSTS======================
router.get("/", async (req, res) => {
  try {
    let post = await Posts.find();
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

//*=====================DELETE BY ID======================
router.delete("/:id", async (req, res) => {
  try {
    // Find post by id
    let post = await Posts.findById(req.params.id);
    // Delete post from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);
    // Delete post from db
    await post.remove();
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

//*=====================UPDATE THE POST=========================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let post = await Posts.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      image_url: result?.secure_url || post.secure_url,
      review: req.body.review || post.review,
      rating: req.body.rating || post.rating,
      cloudinary_id: result?.public_id || post.cloudinary_id,
      dishes_id: req.body.dishes_id || post.dishes_id,
    };

    post = await Posts.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

//*==================FIND POST BY ID==================
router.get("/:id", async (req, res) => {
  try {
    // Find post by id
    let post = await Posts.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;