const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {client} = require('../config/redis')
const {signUp} = require('../models/users')
const {getPassByEmail} = require('../models/auth')

const register = async (req, res)=>{
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        const result = await signUp(req.body, hashPassword)
        res.status(200).json({
            msg : "Register Succes",
            data : result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Register Failed",
            error
        })
    }
}
const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const payload = await getPassByEmail(email)
        const result = await bcrypt.compare(password, payload.password)
        if(!result){
            return res.status(400).json({
                msg : "Wrong email or password"
            })
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn : "1000s"
        })
        await client.set(`token${payload.id}`, token)
        res.status(200).json({
            msg : "Login Succes",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Login Failed",
            error
        })
    }
}
const logout = async (req, res)=>{
    try {
        const bearerToken = req.header("Authorization");
        const oldtoken = bearerToken.split(" ")[1];
        jwt.verify(oldtoken, process.env.JWT_SECRET, async (err, data) => {
            console.log(data);
            if (err) res.status(500).json({ msg: "cannot logout" });
            await client.del(`token${data.id}`);
            res.status(200).json({
            msg: "Logout succes",
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Logout failed",
            error
        })
    }
}


module.exports = {register, login, logout}