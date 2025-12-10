const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    res.send('Hello world, perkenalkna muhammad reza pahlevi')
})

app.listen(3000,()=>{
    console.log('Lsitening on http://localhost:3000')
})