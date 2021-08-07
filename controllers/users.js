const express = require("express")
const router = express.Router()
const pool = require("../db");

// Routes

// READ all users - GET ROUTE
router.get("/", async (req,res)=>{
    try {
        const existingUsers = await pool.query('SELECT * FROM users;')
        res.send(existingUsers.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// CREATE NEW FORM - GET ROUTE
router.get("/new", async (req, res) => {
    res.send("send this to CRA");
  });

// CREATE new user - POST ROUTE
router.post("/", async (req,res)=>{
    try {
        const { username, password, full_name, email, avatar, user_type, mobile, identification_card, driving_license } = req.body
       const newUser = await pool.query('INSERT INTO users (username, password, full_name, email, avatar, user_type, mobile, identification_card, driving_license) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[username, password, full_name, email, avatar, user_type, mobile, identification_card, driving_license]);
      res.json(newUser.rows[0])
      console.log(newUser);
    } catch (error) {
        console.log(error.message)
    }
})

// GET a user - GET ROUTE
router.get("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
       const userX = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    //   res.json(userX.rows[0])
      res.status(200).json(userX.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// UPDATE a user - PUT ROUTE
router.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const { username, password, full_name, email, avatar, user_type, mobile, identification_card, driving_license } = req.body
       const userX = await pool.query('UPDATE users SET username = $2, password = $3, full_name = $4, email = $5, avatar = $6, user_type = $7, mobile = $8, identification_card = $9, driving_license = $10 WHERE user_id = $1', [id, username, password, full_name, email, avatar, user_type, mobile, identification_card, driving_license]);
       res.status(200).send(`User modified with ID: ${id}`)
    } catch (error) {
        console.log(error.message)
    }
})


// DELETE a user - DELETE ROUTE
router.delete("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
       const userX = await pool.query('DELETE FROM users WHERE user_id = $1',[id]);
       res.status(200).send(`User deleted with ID: ${id}`)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;