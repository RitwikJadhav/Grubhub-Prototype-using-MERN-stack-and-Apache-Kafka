const express = require('express');
var mysql = require('mysql');
var pool = require('../../../pool');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');

const Sections = require('../../models/sectionModel');
const Items = require('../../models/itemModel');

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

router.post("/CheckoutOrders", function(req,res) {
    console.log("Inside order checkout page request");
    let orderId  = req.body.orderId;
    let itemOrders = req.body.itemNameForOrder;
    let personName = req.body.personName;
    let status = req.body.status;
    let restaurantName = req.body.restaurantName;
    let total = req.body.totalCost;
    console.log(itemOrders.length);
    for(var i = 0;i < itemOrders.length;i++) {
    let sql = "INSERT INTO orders (orderid,RestaurantName,ItemNames,OrderPersonName,Status,Total) VALUES ("+mysql.escape(orderId)+ "," + mysql.escape(restaurantName)+","+mysql.escape(itemOrders[i])+","+mysql.escape(personName)+","+mysql.escape(status)+","+mysql.escape(total)+")" ;
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log(err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end('Error');
                }
                else {
                    console.log('Success');
                    //res.send(JSON.stringify(result));
                    res.end("Successful order sent");
                }
            })
        }
    });
}
});

module.exports = router;