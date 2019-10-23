const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const UserInfo = require('../../models/userinfoModel');

router.post("/Buyer", function(req,res) {
    var userInfoSignUp = new UserInfo({
            _id : new mongoose.Types.ObjectId(),
            FirstName : req.body.firstName,
            LastName : req.body.lastName,
            Email : req.body.email,
            Password : req.body.password,
            role : req.body.buyer
    });

    userInfoSignUp.save(function(err) {
        if(err) throw err;

        UserInfo.findOne({
            Email : req.body.email
        }, function(err, user) {
            if(err) throw err;

            user.comparePassword(userInfoSignUp.Password, function(err,isMatch) {
                if(err) throw err;
                console.log(userInfoSignUp.Password, isMatch);
            })
        })
        res.sendStatus(200).end('Signup Successful');
    });
    /*userInfoSignUp.save()
    .then(result => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
    res.status(200).json({
        message : "Successfully handled the signup request",
        createdSignup : userInfoSignUp
    });*/
});

router.post("/Owner", function(req,res) {
    const userInfoOwnerSignup = new UserInfo({
        _id : new mongoose.Types.ObjectId(),
        FirstName : req.body.firstName,
        LastName : req.body.lastName,
        Email : req.body.email,
        Password : req.body.password,
        role : req.body.owner,
        RestaurantName : req.body.restaurantName,
        RestaurantZipCode : req.body.restaurantZipCode
    });

    userInfoOwnerSignup.save(function(err) {
        if(err) throw err;

        UserInfo.findOne({
            Email : req.body.email
        }, function(err, user) {
            if(err) throw err;

            user.comparePassword(userInfoOwnerSignup.Password, function(err,isMatch) {
                if(err) throw err;
                console.log(userInfoOwnerSignup.Password, isMatch);
            })
        })
        res.sendStatus(200).end('Signup Successful');
    });

    /*userInfoOwnerSignup.save()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

    res.status(200).json({
        message : "Successfully handled the owner signup request",
        createdOwnerSignup : userInfoOwnerSignup
    });*/
});


module.exports = router;
