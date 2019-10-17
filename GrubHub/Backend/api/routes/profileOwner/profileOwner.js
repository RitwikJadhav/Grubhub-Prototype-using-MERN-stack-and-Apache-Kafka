const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var pool = require('../../../pool');
const passport = require('passport');

const UserInfo = require('../../models/userinfoModel');

router.get('/:id', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside profile edit backend request');
    console.log(req.params.id);
    UserInfo.findOne({
        Email : req.params.id
    })
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'User not found'
            });
        }
        else {
            console.log("Response : "+response)
            console.log(JSON.stringify(response))
            res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err)
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    });
});

router.get('/Edit/:id',passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside profile Owner edit get request using router");
    UserInfo.findOne({
        Email : req.params.id
    })
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'User not found'
            });
        }
        else {
            console.log("Response : "+response)
            console.log(JSON.stringify(response))
            res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err)
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    });

});

router.post("/EditUpdateOwner", function(req,res) {
    console.log("Inside profile Owner post edit update request using router");
    UserInfo.findOneAndUpdate(
        {Email : req.body.Email},
        {$set : {FirstName : req.body.FirstName, LastName : req.body.LastName, Email : req.body.Email, PhoneNumber : req.body.PhoneNumber, RestaurantName : req.body.RestaurantName, RestaurantZipCode : req.body.RestaurantZipCode, Cuisine: req.body.Cuisine}},
        {new : true}
    )
    .then(response => {
        console.log(response);
        if(!response) {
            res.json({
                success : false,
                message : 'Update operation failed'
            })
        }
        else {
            console.log("Response : "+response);
            res.send(JSON.stringify(response));
        }
    })
});


module.exports = router;