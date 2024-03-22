const Book = require("../Modals/BookSchema");
const User = require("../Modals/UserSchema");

// for create new book
const creatBook = async (req, res) => {
    try {
        const { title, author, publicatior, date, genre, userId } = req.body;
        if (!title || !author || !publicatior || !date || !genre || !userId) {
            res.send({
                success: false,
                message: "Please Provide all the fields"
            })
            return
        }

        const isUserExist = await User.findById(userId)
        console.log("userexist", isUserExist);
        if (!isUserExist) {
            res.send({
                success: false,
                message: "User is exist / deleted",
                Data: isUserExist
            })
            return
        }

        const newBook = new Book({
            title: title,
            author: author,
            publicatior: publicatior,
            date: date,
            genre: genre,
            userId: userId
        })
        newBook.save().then((response) => {
            res.send({
                success: true,
                message: "Book is created",
                Data: response
            })
            return
        }).catch((err) => {
            res.send({
                success: false,
                message: "Book conn't be created or Already Register with this name",
                Error: err.stack
            })
            return
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error into create book api",
            Error: error.stack
        })
        return
    }
}

const bookStatusUpdate = async (req, res) => {
    try {
        const { bookId, status } = req.body
        if (!status || !bookId) {
            res.send({
                success: false,
                message: "Please Provide all the fields"
            })
            return
        }
        await Book.findByIdAndUpdate(bookId, {
            status: status
        }, { new: true }).then((response) => {
            res.send({
                success: true,
                message: "Book status is updated",
                Data: response
            })
            return
        }).catch((err) => {
            res.send({
                success: false,
                message: "Book Status cann't updated",
                Error: err.stack
            })
            return
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error into book status update api",
            Error: error.stack
        })
        return
    }
}

const bookList = async (req, res) => {
    try {
        const { userId, sort, search } = req.query;
        const query = {}
        if (!userId) {
            res.send({
                success: false,
                message: "Please Provide all the fields"
            })
            return
        }
        if (userId) {
            query.userId = userId;
        }
        if (search) {
            query.title = search
        }
        const result = await Book.find({ $and: [query] }).sort({ _id: parseInt(sort) })
        res.status(200).send({
            success: true,
            message: "All books of users",
            Data: result
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error into get list of  book api",
            Error: error.stack
        })
        return
    }
}

module.exports = {
    creatBook,
    bookList,
    bookStatusUpdate
}