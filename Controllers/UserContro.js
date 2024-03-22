const Book = require("../Modals/BookSchema");
const User = require("../Modals/UserSchema");


const userCreate = (req, res) => {

    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.send({
                success: false,
                message: "Please Provide all the fields"
            })
            return
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        newUser.save().then((response) => {
            res.send({
                success: true,
                message: "User is created",
                Data: response
            })
            return
        }).catch((err) => {
            res.send({
                success: false,
                message: "User conn't be created /Already Register",
                Error: err.stack
            })
            return
        })

    } catch (error) {
        res.status(503).send({
            success: false,
            message: "Error into user creation api",
            Error: error.stack
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        let result = await User.findOne({ email: email });
        if (result) {
            if (password === result.password) {
                res.send({
                    success: true,
                    message: "User is Authenticate",
                    Data: result

                });
                return
            }
            else {
                res.send({
                    success: false,
                    message: "Not Authorized by Password"
                });
            }
        }
        else {
            res.json({
                success: false,
                message: "Not Authorized by Email"
            });
        }

    } catch (error) {
        res.status(503).send({
            success: false,
            message: "Error into user login api",
            Error: error.stack
        })
    }
}

// this is for user profile 
const userProfile = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.send({
                success: false,
                message: "Please Provide all the fields"
            })
            return
        }
        User.findById(id).then((response) => {
            res.send({
                success: true,
                message: "User profile is found",
                Data: response
            })
            return
        }).catch((err) => {
            res.send({
                success: false,
                message: "User profile is not found",
                Error: err.stack
            })
            return
        })

    } catch (error) {
        res.status(503).send({
            success: false,
            message: "Error into user profile api",
            Error: error.stack
        })
    }
}


// this is for delete the user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.send({
                success: false,
                message: "Please Provide all the fields"
            })
            return
        }
        await User.deleteOne({ _id: userId }).then(async () => {
            await Book.deleteMany({ userId: userId })
        }).then((response) => {
            res.send({
                success: true,
                message: "User profile is deleted",
            })
            return
        }).catch((err) => {
            res.send({
                success: false,
                message: "User profile can not be deleted",
                Error: err.stack
            })
            return
        })

    } catch (error) {
        res.status(503).send({
            success: false,
            message: "Error into user profile deletion api",
            Error: error.stack
        })
    }
}
module.exports = {
    userCreate,
    userLogin,
    userProfile,
    deleteUser
}