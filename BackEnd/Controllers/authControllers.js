const User = require('../Models/users.model')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    let token = req.cookies.token
    if(token) {
        jwt.verify(token, 'SECRET_KEY', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.json({message: "failure", err: err});
            } else {
                const user = await User.findOne({ _id: decodedToken.id })
                res.json({message: "success", user: user});
            }
        })
    }else {
        res.json({message: "failure", error: "token not found!"})
    }
}

const checkUser = (req, res, next) => {
    let token = req.cookies.token
    if(token) {
        next();
    }else {
        res.json({message: "failure", error: "token not found!"})
    }
    // if (token) {
    //     jwt.verify(token, 'SECRET_KEY', async (err, decodedToken) => {
    //         if (err) {
    //             console.log(err.message)
    //             res.locals.user = null
    //             next()
    //         } else {
    //             const user = await User.findOne({ _id: decodedToken.id })
    //             res.locals.user = user;
    //             next();
    //         }
    //     })
    // } else {
    //     res.locals.user = null
    //     next()
    // }
}

const getHome = (req, res) => {
    res.json({message: "success"});
}

module.exports = {auth, checkUser, getHome}