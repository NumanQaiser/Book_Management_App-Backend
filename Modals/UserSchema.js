const mongo = require("mongoose");
const Schema = mongo.Schema;
const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
}, {
    timestamps: true
})

const User = mongo.model("users", userSchema);

module.exports = User
