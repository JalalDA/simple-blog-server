require('dotenv').config()
const express = require('express')
const db = require('./src/config/db')
const mainRouter = require('./src/routes/index')
const cors = require('cors')
const App = express()
const port = process.env.PORT
const {redisCon} = require('./src/config/redis')
redisCon()
    db.connect().then(()=>{
        const corsOptions = {
            origin: ["http://localhost:3000", "https://fazzniture.netlify.app"],
            methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
            allowedHeaders: ["Content-Type", "Authorization"],
        };

        App.use(cors(corsOptions));
        App.use(express.json())
        App.use(express.urlencoded({extended : false}))
        console.log(`Database connected`);
        App.use(mainRouter)
        App.listen(port, ()=>{
            console.log(`Connected at port ${port}`);
        } )
    }).catch(err=>{
        console.log(err);
    })
    