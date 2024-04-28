const router = require('express').Router()
const authConntrollers = require('../Controllers/authControllers')
const jwt = require('jsonwebtoken')


router.get('/', authConntrollers.auth, authConntrollers.getHome);

module.exports = router