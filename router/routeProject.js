var router=require('express').Router()
var bodyParser=require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://ramzy:12345@localhost:27017/basketin_db';

router.use(bodyParser.json())

//Get all data
router.get('/data',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        console.log("Terhubung ke MongoDB!");
        var koleksi=client.db('basketin_db').collection('users')
        koleksi.find().toArray((err,data)=>{
            console.log(data)
            res.send(data)
            client.close();
        })
        })
})

//Get specific data by...
router.get('/data/:index',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        console.log("Terhubung ke MongoDB!");
        var koleksi=client.db('basketin_db').collection('users')
        koleksi.find().toArray((err,data)=>{
            console.log(data[req.params.index-1])
            res.send(data[req.params.index-1])
            client.close();
        })
        })
})

//Post data
router.post('/data',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        console.log("Terhubung ke MongoDB!");
        var koleksi=client.db('basketin_db').collection('users')
        koleksi.insertOne({
                name:req.body.nama,
                email:req.body.surel,
                phone:req.body.telepon,
                username:req.body.usernm,
                password:req.body.pwd
        }, ()=>{
            console.log('Data Terkirim!')
            res.send({
                name:req.body.nama,
                email:req.body.surel,
                phone:req.body.telepon,
                username:req.body.usernm,
                password:req.body.pwd,
                status: 'Data Terkirim!'
            })
            client.close()
        })
        })
})

//Delete data by index
router.delete('/data/:index',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        console.log("Terhubung ke MongoDB!");
        var koleksi=client.db('basketin_db').collection('users')
        koleksi.find().toArray((err,data)=>{
            koleksi.deleteOne({nama:data[req.params.index-1].nama}, ()=>{
                console.log('Data Terhapus')
                res.send('Data Terhapus')
                client.close()
            })
        })
        });
})

//PUT Update Data by Index Array
router.put('/data/:index',(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        console.log("Terhubung ke MongoDB!");
        var koleksi=client.db('basketin_db').collection('users')
        koleksi.find().toArray((err,data)=>{
            koleksi.updateOne({
                nama:data[req.params.index-1].nama}, 
            {
                $set:{ name:req.body.nama,
                    email:req.body.surel,
                    phone:req.body.telepon,
                    username:req.body.usernm,
                    password:req.body.pwd,
                    status:'Data Terupdate'
            }},
            ()=>{
                console.log('Data Terupdate')
                client.close()
            })
        })
        });
})

module.exports=router