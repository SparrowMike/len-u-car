const {Pool} = require("pg");

const pool = new Pool({
    database: "jay",
    user:"jay",
    password:'jay'

});

module.exports = pool;