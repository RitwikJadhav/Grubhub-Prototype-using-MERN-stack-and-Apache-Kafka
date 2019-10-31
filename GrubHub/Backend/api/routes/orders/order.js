const express = require('express');
var mysql = require('mysql');
var pool = require('../../../pool');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');

const Orders = require('../../models/orderModel');

router.post("/RecentOrderReq", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside recent order get request");
    Orders.find({
        RestaurantName : req.body.restaurantName
    })
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'Error while retrieving orders'
            });
        }
        else {
            console.log("Response from the database : "+ response);
            res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    });
});

router.post("/OrderStatusUpdate",  passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside recent order get request");

    Orders.findOneAndUpdate(
        {OrderPersonName : req.body.orderPersonName},
        {$set : {Status : req.body.selectedValue}}
    )
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'Error while retrieving orders'
            });
        }
        else {
            console.log("Response from the database : "+ response);
            res.json({
                success : true,
                message : 'Item updated successfully'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    })
});

router.post("/GetRecentOrderRequest", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside recent order get customer request");
    //const personName = req.body.firstName + " " + req.body.lastName;
    console.log(req.body.fullName);
    Orders.find({
        OrderPersonName : req.body.fullName
    })
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'Error while retrieving orders'
            });
        }
        else {
            console.log("Response from the database : "+ response);
            res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    })
});


router.post("/GetDeliveredItems", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside recent order get delivered customer request");
    const personName = req.body.firstName + " " + req.body.lastName;
    Orders.find({
        OrderPersonName : personName,
        Status : 'Order delivered'
    })
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'Error while retrieving orders'
            });
        }
        else {
            console.log("Response from the database : "+ response);
            res.send(JSON.stringify(response));
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Something went wrong'
        });
    })
});

module.exports = router;
