const router = require("express").Router();
const { cloudinary } = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const Posts = require("../../models/posts");

//!====================================GRAVEYARD=======================================

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

// input type = file name = "image" //! for front end ~13:00

module.exports = router;

//! =================================================================================

//! FROM POST CONTROLLER
// update a post
router.put("/:id", (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedPost);
    }
  );
});

// delete a post
router.delete("/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedPost);
  });
});

// create a post
router.post("/new", (req, res) => {
  Posts.create(req.body, (error, createdPost) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdPost);
  });
});

router.get("/seed", (req, res) => {
  Posts.create(
    [
      {
        image_url:
          "https://asianfoodnetwork.com/content/dam/afn/global/en/articles/5-must-try-food-in-one-of-singapore%27s-most-awarded-hawker-centers/curry%20mee.png",
        review: "awesome chicken curry",
        rating: "3",
        timestamp: new Date(),
        posted_by: "1234",
        liked_by: "1123",
        hc_id: "maxwell-123",
        hs_id: "tiantian-125125",
        dishes_id: "dish-chickenrice",
      },

      {
        image_url:
          "http://www.ricebowlasia.com/wp-content/uploads/2019/11/is-nasi-lemak-malaysian.jpg",
        review: "rice was a tad too dry and not lemak enoguh",
        rating: "1",
        timestamp: new Date(),
        posted_by: "1114",
        liked_by: "1293",
        hc_id: "maxwell-123",
        hs_id: "ahsengnasilemak-190125",
        dishes_id: "dish-nasilemak",
      },

      {
        image_url:
          "https://1.bp.blogspot.com/-js5g5f7grTE/XUA-mdQPiJI/AAAAAAAAPxU/BjGAIxYIfB4T8hsAenv_kYaGmBRPNKf8gCLcBGAs/s1600/Hor%2BFun%2BPremium%2B%2528Alexandra%2BVillage%2BFood%2BCentre%2529%2B-%2BMixed%2BSeafood%2BHor%2BFun.jpg",
        review: "tasty gravy so awesome",
        rating: "3",
        timestamp: new Date(),
        posted_by: "0034",
        liked_by: "1923",
        hc_id: "maxwell-123",
        hs_id: "yumhorfun-100125",
        dishes_id: "dish-beefhorfun",
      },
    ],
    (err, data) => {
      res.redirect("/v1/posts");
    }
  );
});
