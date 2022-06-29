const db = require('../config/db')
const {v4 : uuidv4} = require('uuid')

const signUp = (body, hashPassword)=>{
    return new Promise((resolve, reject)=>{
        const id = uuidv4()
        const created_at = new Date(Date.now())
        const {email, phone} = body
        const sqlQuery = "insert into users (id, email, password, phone, created_at) values($1, $2, $3, $4, $5) returning email, phone"
        db.query(sqlQuery, [id, email, hashPassword, phone, created_at])
        .then(result =>{
            resolve(result.rows)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

const getUserById = (id)=>{
    return new Promise((resolve, reject)=>{
        db.query("SELECT id, username, email, phone, photo FROM users where id = $1", [id])
        .then(result=>{
            resolve(result.rows)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

const getAllUsers = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT id, username, email, phone, photo FROM users')
        .then(result=>{
            resolve(result)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

module.exports = {signUp, getUserById, getAllUsers}