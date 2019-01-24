var express=require('express')
var cors=require('cors')
var routeProject=require('./router/routeProject')

var app=express()
app.use(cors())
app.use(routeProject)

app.get('/',(req,res)=>{
    res.send('<h1>MongoDB Basketin</h1>')
})

app.listen(4321, ()=>{
console.log('Server aktif di port 4321')
})