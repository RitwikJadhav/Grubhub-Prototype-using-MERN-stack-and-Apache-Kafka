const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');


router.post("/", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Search");

    kafka.make_request('get_searched_items',req.body, function(err,results){
        console.log('Kafka response received <<');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success : false,
                message : "Something went wrong"
            });
        }
        else {
            console.log("Results received successfully --->");
            console.log(JSON.stringify(results));
            res.send(JSON.stringify(results));
        }
    });
});

module.exports = router;