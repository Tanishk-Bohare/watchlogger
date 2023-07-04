const express = require('express')
const saveLog = require('./saveLog')
const cors = require('cors')

const app = express()

app.use(cors());

app.get("/home", (req,res)=>{
    saveLog.save("hitting home API" + '\n')
    res.send("API home")
})

app.get('/count', (req, res)=>{
    saveLog.save("hitting count API" + '\n')
    res.send("API count")
})

app.listen(3001, ()=>{
    console.log("Real server is running at ",3001)
})
