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
    /*let orderid = req.body.orderid;
    let totalCost = req.body.orderTotalCost;
    let restaurantName = req.body.restaurantName;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let fullName = firstName + " " + lastName;
    let sql = "SELECT ItemNames,Status,Total,RestaurantName from orders WHERE OrderPersonName = "+mysql.escape(fullName)+" AND Status <> 'Order delivered'";
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
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });*/
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
    /*let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let orderPersonName = firstName +" "+ lastName;
    let sql = "SELECT ItemNames,Status,Total,RestaurantName from orders WHERE OrderPersonName = "+mysql.escape(orderPersonName)+" AND Status = 'Order Delivered'";
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
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong data");
                }
                else if(result.length == 0) {
                    console.log('No data received');
                }
                else {
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });*/
});

module.exports = router;
