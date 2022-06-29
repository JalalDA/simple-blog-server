const db = require('../config/db')
const {v4 : uuidv4} = require('uuid')


const createArticles = (body)=>{
    return new Promise((resolve, reject)=>{
        const id = uuidv4()
        const created_at = new Date(Date.now())
        const {author, tittle, content} = body
        db.query('INSERT INTO articles(id, tittle, "content", author, created_at) VALUES($1, $2, $3, $4, $5)', [id, tittle, content, author, created_at])
        .then((result)=>{
            resolve(result.rows)
        }).catch(err=>{
           reject(err)
        })
    })
}

const getArticleById = (id)=>{
    return new Promise((resolve, reject)=>{
        db.query('select * from articles where id = $1', [id])
        .then(result =>{
            resolve(result.rows[0])
        })
        .catch(err=>{
            reject(err)
        })
    })
}

const getAllArticle = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('select * from articles')
        .then(result=>{
            resolve(result.rows)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

const editArticle = (id, body)=>{
    return new Promise((resolve, reject)=>{
    const {content, author, tittle} = body
    const updated_at = new Date(Date.now())
    db.query("UPDATE articles SET content=COALESCE(NULLIF($1, ''), content), author=COALESCE(NULLIF($2, ''), author), tittle=COALESCE(NULLIF($3, ''), tittle), updated_at=COALESCE(NULLIF($4, '')::timestamp, updated_at) where id=$5 returning *",[content, author,tittle, updated_at, id] )
    .then(result =>{
        resolve(result.rows[0])
    })
    .catch(err=>{
        reject(err)
    })
    })
}
const deleteArticle = (id)=>{
    return new Promise((resolve, reject)=>{
        db.query('delete from articles where id = $1', [id])
        .then(result=>{
            resolve(result)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = {createArticles, getArticleById, getAllArticle, editArticle, deleteArticle}
