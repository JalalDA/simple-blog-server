const {createArticles, getArticleById, getAllArticle, editArticle, deleteArticle} = require('../models/articles')

const postNewArticle = async (req, res)=>{
    try {
        const result = await createArticles(req.body)
        res.status(200).json({
            msg : "Succes create article",
            result,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Failed create article",
            error
        })
    }
}
const getSingleArticle = async (req, res)=>{
    try {
        const {id} = req.params
        const result = await getArticleById(id)
        res.status(200).json({
            msg : `Show article with id ${id}`,
            result,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "cannot get article",
            error
        })
    }
}
const showAllArticle = async (req, res)=>{
    try {
       const result = await getAllArticle()
       
       res.status(200).json({
        msg : "show all article",
       result
       })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Cannot get article",
            error
        })
    }
}
const updateArticle = async (req, res)=>{
    try {
        const {id} = req.params
        const result = await editArticle(id, req.body)
        res.status(200).json({
            msg : `Succes update article with id = ${id}`,
            result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Cannot update article",
            error
        })
    }
}

const hardDeleteArticle = async (req, res)=>{
    try {
        const {id} = req.params
        await deleteArticle(id)
        res.status(200).json({
            msg : `Succes delete article with id = ${id}`
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Failed to delete article",
            error
        })
    }
}

module.exports = {postNewArticle, getSingleArticle, showAllArticle, updateArticle, hardDeleteArticle}