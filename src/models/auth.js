const db = require('../config/db')

const getPassByEmail = async (email)=>{
    console.log(email);
    try {
        const result = await db.query('select * from users where email = $1', [email])
        if(result.rowCount === 0) throw {status : 400, err : {msg : "Email is not registered"}}
        return result.rows[0]
    } catch (error) {
        throw {error}
    }
}

module.exports = {getPassByEmail}