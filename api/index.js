const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("../Routes/UserRoute");
const bookRouter = require("../Routes/BookRoute");
require("../Configuration/DB")


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: 1000, parameterLimit: 1000 }));
app.use("/user", userRouter)
app.use("/book", bookRouter)

const port = process.env.PORT || 4000;

app.listen(port, () => {

    console.log("Server is running on port", port);
})