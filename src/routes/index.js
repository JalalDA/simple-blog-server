const express = require('express')
const Router = express.Router()
const authRouter = require('./auth')
const articleRouter = require('./articles')

Router.use('/auth', authRouter)
Router.use('/articles', articleRouter)
Router.get('/', (req, res)=>{
    res.json({
        msg : "Wellcome to my little server"
    })
})

module.exports = Router