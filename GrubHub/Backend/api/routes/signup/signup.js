const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const UserInfo = require('../../models/userinfoModel');

router.post("/Buyer", function(req,res) {
    const userInfoSignUp = new UserInfo({
            _id : new mongoose.Types.ObjectId(),
            FirstName : req.body.firstName,
            LastName : req.body.lastName,
            Email : req.body.email,
            Password : req.body.password,
            role : req.body.buyer
    });

    userInfoSignUp.save()
    .then(result => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
    res.status(200).json({
        message : "Successfully handled the signup request",
        createdSignup : userInfoSignUp
    });
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

    userInfoOwnerSignup.save()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

    res.status(200).json({
        message : "Successfully handled the owner signup request",
        createdOwnerSignup : userInfoOwnerSignup
    });
});


module.exports = router;
