const express = require('express')
const connect = require('./database/connect')
const router = require('./routers/routes')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//custome middleware
app.use('/api/v1',router)

const start = async()=>{
try {
    await connect (process.env.DATABASE_CONNECTION)
    console.log("connected to database sucessfully")
    app.listen(port, () =>{
        console.log(`server is listening on port ${port}`)
    })
} catch (error) {
    console.log(error.message)
}
}
start();