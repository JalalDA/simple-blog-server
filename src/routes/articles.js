const express = require('express')
const Router = express.Router()
const articlesController = require('../controllers/articles')

Router.post('/create-article', articlesController.postNewArticle)
Router.get('/:id', articlesController.getSingleArticle)
Router.get('/', articlesController.showAllArticle)
Router.patch('/update/:id', articlesController.updateArticle)
Router.delete('/delete/:id', articlesController.hardDeleteArticle)
module.exports = Router