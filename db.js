const {Pool} = require("pg");

const pool = new Pool({

    // host: "localhost",
    // port: 5432,
    // database: "users"

    user: "hqmnrcgvmaenbf",
    host: "ec2-54-196-65-186.compute-1.amazonaws.com",
    port: 5432,
    database: "dc1arqanp0ep12",
    password: "224d8c4f2c9231aebe54ff2f052edaf725c78366fa22f49cfa7c03a6557958bf",
    ssl: {
        rejectUnauthorized: false
      }


});

module.exports = pool;