const express = require("express");
const { userCreate, userLogin, userProfile, deleteUser } = require("../Controllers/UserContro");
const router = express.Router();


// for create the user account
router.post("/create", userCreate)


// for user login
router.post("/login", userLogin)

// for see user profile
router.get("/profile/:id", userProfile)

// this is for delete the user profile with associated records
router.delete("/delete/:userId", deleteUser)

module.exports = router