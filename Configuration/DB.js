const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://numan:numan@bookappcluster.dzq8qgh.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log("Database cann't be connected", err.stack);
})