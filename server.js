//! BASED ON ======> https://www.youtube.com/watch?v=ldYcgPKEZC8

//*=====================DEPENDENCIES=====================
const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const path = require("path");

//*===================CONFIGURATIONS======================
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  // port: 6379,
  // host: 'localhost'
  // for redis cloud version
  host: "ec2-52-54-10-192.compute-1.amazonaws.com",
  port: 16120,
  password: process.env.REDISPW,
  tls: {
    rejectUnauthorized: false,
  },
});
redisClient.on("error", (err) => {
  console.log("redisClient Error " + err);
});

// EXPORT
module.exports = redisClient;

const HerokuRedisStore = new RedisStore({ client: redisClient });

//* ==============BODY PARSER, MIDDLEWARE====================
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    store: HerokuRedisStore,
    name: "sessionID",
    secret: process.env.SECRET || "test_secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

//*=================CONTROLLERS/ROUTES====================
const usersController = require("./controllers/users");
const carsController = require("./controllers/cars");
const carImagesController = require("./controllers/carImages");
const sessionsController = require("./controllers/sessions.js");
const carRentalEventController = require("./controllers/carRentalEvent.js");
const carRentalReviewController = require("./controllers/carRentalReview");
app.use("/users", usersController);
app.use("/cars", carsController);
app.use("/images", carImagesController);
app.use("/sessions", sessionsController);
app.use("/carRentalEvent", carRentalEventController);
app.use("/carRentalReview", carRentalReviewController);

//* ===========HEROKU DEPLOYMENT MIDDLEWARE==================
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// });

//*==================LISTENER=====================
app.listen(PORT, () => {
  console.log("Car rental has started on port", PORT);
});
