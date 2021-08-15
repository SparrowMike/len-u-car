const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  // heroku postgres
  user: "hqmnrcgvmaenbf",
  host: "ec2-54-196-65-186.compute-1.amazonaws.com",
  port: 5432,
  database: "dc1arqanp0ep12",
  password: process.env.POSTGRESPW,
  ssl: {
    rejectUnauthorized: false,
  },

  // local postgres
  // database: "jay",
  // user:"jay",
  // password:'jay'
});

module.exports = pool;
