const express = require('express');
var mysql = require('mysql');
var pool = require('../../../pool');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');

const Sections = require('../../models/sectionModel');
const Items = require('../../models/itemModel');
const Orders = require('../../models/orderModel');

router.get("/DetailsPage/:id", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside restaurant details result post request");

    console.log(req.params.id);
    Sections.find({
        RestaurantName : req.params.id
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

});

router.post("/RestaurantItemsPage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside restaurant items search result post request");

    console.log('Restaurant Name from items page : ' +req.body.restaurantName);
    console.log('Section Name from items page : '+req.body.localsection);
    Items.find({
        RestaurantName : req.body.restaurantName,
        SectionName : req.body.localsection
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
});

router.post("/CheckoutOrders", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside order checkout page request");

        const addOrders = new Orders({
            _id : new mongoose.Types.ObjectId(),
            ItemNames : req.body.itemNameForOrder,
            RestaurantName : req.body.restaurantName,
            OrderPersonName : req.body.personName,
            Status : req.body.status,
            Total : req.body.totalCost,
        })
        addOrders.save(function(err,result) {
            if(err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.send(JSON.stringify(result));
            }
        });
});

module.exports = router;