const User = require('../Models/users.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const getUsers = async (req, res) => {
    await User.find()
        .then((users) => res.json(users))
        .catch((err) => res.json(err))
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    await User.findOne({ email })
        .then(async (user) => {
            if (user) {
                res.json({ message: "This email alreay exists! - login" })
            } else {
                const salt = bcrypt.genSaltSync(6);
                const hash = bcrypt.hashSync(password, salt);

                await User.create({ name, email, password: hash })
                    .then((user) => {
                        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                        // res.cookie("token", token)
                        res.json({ message: "success", user: user, token: token })
                    })
                    .catch((err) => res.json({ message: 'something went wrong! - user not created, try again', err: err }))
            }
        })
        .catch(err => res.json(err))
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    await User.findOne({ email })
        .then(async (user) => {
            if (user) {
                if(await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: '24h'});
                    // await res.cookie("token", token, {httpOnly: false, maxAge: 24 * 60 * 60 * 10000})
                    res.json({message: "success", user: user, token: token})
                }else {
                    res.json({message: "failure", err: "Incorrect password!"})
                }
            } else {
                res.json({ message: "failure", err: "User not found - signup" });
            }
        })
}

const updateUser = async (req, res) => {
    const id = req.params.id
    const updatedUser = req.body

    await User.findByIdAndUpdate(id, updatedUser, { new: true })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => res.json(err));
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json("Logged Out");
}

module.exports = { getUsers, registerUser, loginUser, updateUser, logoutUser }