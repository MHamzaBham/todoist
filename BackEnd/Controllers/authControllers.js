const User = require('../Models/users.model')
const jwt = require('jsonwebtoken')

// not being used since localStorage is used
// const auth = (req, res, next) => {
//     let token = req.cookies.token
//     if(token) {
//         jwt.verify(token, 'SECRET_KEY', async (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message)
//                 res.json({message: "failure", err: err});
//             } else {
//                 const user = await User.findOne({ _id: decodedToken.id })
//                 res.json({message: "success", user: user});
//             }
//         })
//     }else {
//         res.json({message: "failure", error: "token not found!"})
//     }
// }

const getHome = (req, res) => {
    res.json({message: "success"});
}

module.exports = {getHome}