const express = require('express');
var mysql = require('mysql');
var pool = require('../../../pool');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
var kafka = require('../../kafka/client');
const Orders = require('../../models/orderModel');

router.post("/RecentOrderReq", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Recent Order Request");

    kafka.make_request('get_order_restaurant',req.body, function(err,results){
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

router.post("/OrderStatusUpdate",  passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Update order status");

    kafka.make_request('update_order_status',req.body, function(err,results){
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

router.post("/GetRecentOrderRequest", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside /Get Active Orders");
    //const personName = req.body.firstName + " " + req.body.lastName;

    kafka.make_request('get_active_orders',req.body, function(err,results){
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


router.post("/GetDeliveredItems", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside recent order get delivered customer request");

    kafka.make_request('get_delivered_orders',req.body, function(err,results){
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
