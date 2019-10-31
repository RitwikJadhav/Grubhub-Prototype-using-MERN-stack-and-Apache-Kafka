//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
app.use(passport.initialize());
const UserInfo = require('../Backend/api/models/userinfoModel');
app.set('view engine', 'ejs');
var kafka = require('./api/kafka/client');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

mongoose.connect('mongodb+srv://root:ritwik@grubhub-pqhor.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true
},{
    userMongoClient : true
},{
    useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false);
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

require('./api/auth/auth')(passport);

const loginRoutes = require('./api/routes/login/login');
const signUpRoutes = require('./api/routes/signup/signup');
const profileRoutes = require('./api/routes/profile/profile');
const profileOwnerRoutes = require('./api/routes/profileOwner/profileOwner');
const menuRoutesHomePage = require('./api/routes/menu/homepage');
const searchRoutes = require('./api/routes/search/searchResults');
const restaurantRoutes = require('./api/routes/restaurants/restaurantDetails');
const orderRoutes = require('./api/routes/orders/order');
const messageRoutes = require('./api/routes/message/messages');

app.use('/Login',loginRoutes);
app.use('/Signup',signUpRoutes);
app.use('/Profile',profileRoutes);
app.use('/ProfileOwner',profileOwnerRoutes);
app.use('/Menu',menuRoutesHomePage);
app.use('/SearchResults',searchRoutes);
app.use('/Restaurant',restaurantRoutes);
app.use('/Order',orderRoutes);
app.use('/Message',messageRoutes);

const storage = multer.diskStorage({
    destination : path.join(__dirname,".") + "/public/uploads",
    filename : function(req,file,cb) {
        cb(null,"user" + req.params.id + path.extname(file.originalname));
    }
});

const uploads = multer({
    storage : storage,
    limits : {fileSize : 1000000},
}).single("myImage");

app.post("/uploads/:id", function(req,res) {
    uploads(req,res, function(err) {
        console.log("Request -----",req.body);
        console.log("Request file ----",req.file);

        if(!err) {
            return res.sendStatus(200).end();
        }
        else {
            console.log('Error!');
        }
    })
})

app.get("/uploads/:id", function(req,res) {
    var image = path.join(__dirname, ".") + "/public/uploads/user"+req.params.id;
    if(fs.existsSync(image + '.jpg')) {
        res.sendFile(image + '.jpg');
    }
    else if(fs.existsSync(image + '.jpeg')) {
        res.sendFile(image + '.jpeg');
    }
    else if(fs.existsSync(image + '.png')) {
        res.sendFile(image + '.png');
    }
    else {
        res.sendFile(image+'Not Found.png')
    }
})


/*const storageImage = multer.diskStorage({
    destination : path.join(__dirname,".") + "/public/uploadsItem",
    filename : function(req,file,cb) {
        cb(null,"item-" + req.params.imageId + path.extname(file.originalname));
    }
});

const uploadImage = multer({
    storageImage : storageImage,
    limits : {fileSize : 1000000},
}).single("myItemImage");

app.post("/uploadsItem/:imageId", function(req,res) {
    uploadImage(req,res, function(err) {
        console.log("Request -----",req.body);
        console.log("Request file ----",req.file);

        if(!err) {
            console.log('Successful');
            return res.sendStatus(200).end();
        }
        else {
            console.log('Error!');
        }
    })
})

app.get("/uploadsItem/:imageId", function(req,res) {
    var image = path.join(__dirname, ".") + "/public/uploadsItem/item-"+req.params.imageId;
    if(fs.existsSync(image + '.jpg')) {
        res.sendFile(image + '.jpg');
    }
    else if(fs.existsSync(image + '.jpeg')) {
        res.sendFile(image + '.jpeg');
    }
    else {
        res.sendFile(image + '.png');
    }
})*/

app.listen(3001);
console.log("Server listening on port 3001");


