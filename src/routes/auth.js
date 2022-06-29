const express = require('express')
const Router = express.Router()
const authController = require('../controllers/auth')
const {verifyToken, chekDuplicateEmail} = require('../middlewares/auth')

Router.post('/register', chekDuplicateEmail, authController.register)
Router.post('/login', authController.login)
Router.delete('/logout', verifyToken, authController.logout)

module.exports = Router