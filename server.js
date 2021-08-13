//! BASED ON ======> https://www.youtube.com/watch?v=ldYcgPKEZC8

//*=====================DEPENDENCIES=====================
const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");        
const redis = require('redis');                    
const connectRedis = require('connect-redis');      


//*===================CONFIGURATIONS======================
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const RedisStore = connectRedis(session);                         
const redisClient = redis.createClient({
  // for redis local version
  port: 6379,
  host: 'localhost'  

  // for redis cloud version
  // host: "ec2-52-54-10-192.compute-1.amazonaws.com",
  // port: 16120,
  // password: "p9a8f345c693fbbb525145c11d037fdfe2c4fc08f25452579adc4b2947d2435c8",
  // tls: {
  //   rejectUnauthorized: false,
  // },
});
redisClient.on("error", (err) => {
  console.log("redisClient Error " + err);
});

// EXPORT
module.exports = redisClient;

const HerokuRedisStore = new RedisStore({ client: redisClient }); 

//* ==============BODY PARSER, MIDDLEWARE====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( session({                                   
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
app.use("/users", usersController);
app.use("/cars", carsController);
app.use("/images", carImagesController);
app.use("/sessions", sessionsController); 

//*==================LISTENER=====================
app.listen(PORT, () => {
  console.log("Car rental has started on port", PORT);
});

