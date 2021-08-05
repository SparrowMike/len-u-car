const express = require("express")
const router = express.Router()
const pool = require("./db");

// Routes

// NEW USER POST ROUTE
router.get("/users/new", async (req,res)=>{
    try {
        const newUser = await pool.query("INSERT INTO users", req.body)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;