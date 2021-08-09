//! BASED ON ======> https://www.youtube.com/watch?v=ldYcgPKEZC8

//*=====================DEPENDENCIES=====================
const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");         // +
const redis = require('redis');                     // +
const connectRedis = require('connect-redis');      // +

//*===================CONFIGURATIONS======================
require("dotenv").config();
const PORT = process.env.PORT || 3003;     

const RedisStore = connectRedis(session);                         // +
const redisClient = redis.createClient({                          // +
  port: 6379,
  host: 'localhost'  // need to change to heroku redis?
});
const HerokuRedisStore = new RedisStore({client: redisClient})    // +

//* ==============BODY PARSER, MIDDLEWARE====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use( session({                                    // +
  store: HerokuRedisStore,
  secret: process.env.SECRET || "test_secret",
  saveUninitialized: false,
  resave: false,
  cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30
  }
}));

//*=================CONTROLLERS/ROUTES====================
const usersController = require("./controllers/users");
const carsController = require("./controllers/cars");
const sessionsController = require("./controllers/sessions.js");   // +
app.use("/users", usersController);
app.use("/cars", carsController);
app.use("/sessions", sessionsController);                          // +

//*==================LISTENER=====================
app.listen(PORT, () => {
  console.log("Car rental has started on port", PORT);
});
