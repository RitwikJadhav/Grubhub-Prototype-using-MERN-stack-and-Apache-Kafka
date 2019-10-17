const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var pool = require('../../../pool');
const mongoose = require('mongoose');
const passport = require('passport');

const UserInfo = require('../../models/userinfoModel');

router.get('/:id',passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log(req.params.id);
    UserInfo.findOne({
        Email : req.params.id
    })
    .then(response => {
        console.log("Response from the database : "+response)
        console.log(JSON.stringify(response))
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err)
    });
});

router.get('/Edit/:id', passport.authenticate('jwt',{ session : false }), function(req,res) {

    UserInfo.findOne({
        Email : req.params.id
    })
    .then(response => {
        console.log("Response : "+response);
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    });
})

router.post('/EditUpdate',function(req,res) {
    console.log("Inside profile post edit update request using router");
    console.log(req.body.Email);
    UserInfo.findOneAndUpdate(
        {Email : req.body.Email},
        {$set : {FirstName : req.body.FirstName, LastName : req.body.LastName, Email : req.body.Email, PhoneNumber : req.body.PhoneNumber}},
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
})

module.exports = router;