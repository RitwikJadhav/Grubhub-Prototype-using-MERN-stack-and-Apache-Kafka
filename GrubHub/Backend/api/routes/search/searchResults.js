const express = require('express');
var mysql = require('mysql');
var pool = require('../../../pool');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');

const Items = require('../../models/itemModel');

router.post("/", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside search result post request");
    console.log(req.body.itemToSearch);
    Items.find({
        itemName : req.body.itemToSearch
    })
    .then(response => {
        console.log("Response from the database for Menu : "+response)
        console.log(JSON.stringify(response))
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    });
});

module.exports = router;