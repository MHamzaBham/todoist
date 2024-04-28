const router = require('express').Router()
const userControllers = require('../Controllers/userControllers')

// gets all the users
router.get('/', userControllers.getUsers)

// adds / registers a new user
router.post('/register', userControllers.registerUser)

// logins the user
router.post('/login', userControllers.loginUser)

// updates the user
router.post('/update/:id', userControllers.updateUser)


// Logout route
router.get('/logout', userControllers.logoutUser)

module.exports = router