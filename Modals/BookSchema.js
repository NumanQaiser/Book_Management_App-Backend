const mongo = require("mongoose");
const Schema = mongo.Schema;
const bookSchema = Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicatior: {
        type: String
    },
    date: {
        type: String
    },
    genre: {
        type: String
    },
    userId: {
        type: mongo.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        default: "planning"
    }
}, {
    timestamps: true
})

const Book = mongo.model("books", bookSchema);

module.exports = Book
