const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology:true})

        
 .then(client=>{
     console.log('Connected to database')
     const db = client.db('WishListDB')
     const NameandWish = db.collection('NameandWish')
     app.set('view engine','ejs')
     app.listen(2000,function(req,res){
        console.log('The server is running')
    })
    app.get('/', function(req,res){
        res.sendFile(__dirname+'/index2.html')
    })
    app.set('views', __dirname + '/views');
    app.get('/wishlist',function(req,res){
      db.collection('NameandWish').find().toArray()
        .then(result=>{
            console.log(result)
            res.render('wishlist.ejs', {Wishlist:result})
        })
        .catch(error=>{
            console.error(error)
        })
     })
    
    app.post('/wishlist',function(req,res){
        NameandWish.insertOne(req.body)
        .then(result=>{ 
            res.redirect('/wishlist')
        })


        .catch(error=>{
            console.error(error)
        })
    })
 })





