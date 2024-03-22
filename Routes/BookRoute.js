const express = require("express");
const { creatBook, bookList, bookStatusUpdate } = require("../Controllers/BookContro");
const router = express.Router();

// this is for create the book
router.post("/create", creatBook);

// book status update
router.put("/status", bookStatusUpdate)

// for get the book list
router.get("/list", bookList);


module.exports = router