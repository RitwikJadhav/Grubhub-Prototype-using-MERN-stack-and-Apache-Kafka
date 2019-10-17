const express = require('express');
const bcrypt = require('bcryptjs');
var mysql = require('mysql');
var pool = require('../../../pool');
const mongoose = require('mongoose');
const router = express.Router(); 
const passport = require('passport');

const Sections = require('../../models/sectionModel');
const Items = require('../../models/itemModel');

router.get('/HomePage/:id', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log(req.params.id);
    Items.find({
        RestaurantName : req.params.id
    })
    .then(response => {
        console.log("Response from the database for Menu : "+response)
        console.log(JSON.stringify(response))
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err)
    });
});

router.post("/SectionAddPage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside item add page request using router");
    const addSections = new Sections({
        _id : new mongoose.Types.ObjectId(),
        sectionName : req.body.sectionName,
        sectionDescription : req.body.sectionDesc,
        RestaurantName : req.body.restaurantName
    });
    addSections.save()
    .then(result => {
        if(!result) {
            res.json({
                success : false,
                message : 'Error in adding sections'
            });
        }
        else {
            console.log("Response from the database : "+ result);
            res.json({
                success : true,
                message : 'Sections added successfully'
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.json({
            success : false,
            message : 'Error in adding sections'
        });
    });
});


router.post("/ItemRemovePage", function(req,res) {
    console.log("Inside item remove page request using router");

    Items.findOne({
        itemName : req.body.itemToRemove
    })
    .remove()
    .exec()
    .then(response => {
        if(!response) {
            res.json({
                success : false,
                message : 'Item not deleted'
            });
        }
        else {
            res.json('Item deleted');
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


router.post("/ItemAddPage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside item add page request using router");
    
    Sections.findOne({
        sectionName : req.body.itemSection
    }, function(err, section) {
        if(err) {
            console.log(err);
            res.json({
                success: false,
                message : 'Something went wrong'
            });
            return
        }
        const addItems = new Items({
            _id : new mongoose.Types.ObjectId(),
            itemName : req.body.itemName,
            description : req.body.itemDesc,
            itemprice : req.body.itemPrice,
            SectionName : req.body.itemSection,
            sectionId : section._id,
            RestaurantName : req.body.restaurantName
        });
        addItems.save()
        .then(result => {
            if(!result) {
                res.json({
                    success : false,
                    message : 'Error in adding sections'
                });
            }
            else {
                console.log("Response from the database : "+ result);
                res.json({
                    success : true,
                    message : 'Items added successfully'
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success : false,
                message : 'Error in adding sections'
            });
        });
    })
});

router.post("/SectionRemove", function(req,res) {
    console.log("Inside item remove page request");
    const sectionRemove = req.body.sectionToRemove;
    console.log("Section to remove : " +sectionRemove);
    Sections.deleteOne({
        sectionName : req.body.sectionToRemove
    }, function(err, section) {
        if(err) {
            console.log(err);
            res.json({
                success: false,
                message : 'Something went wrong'
            });
            return
        }
        console.log('Inside the nested item remove request');
        console.log('Item section Name : '+sectionRemove);
        Items.deleteOne({
            SectionName : sectionRemove
        })
        .then(response => {
            console.log(response);
            res.json({
                success : true,
                message : "Item deleted"
            });
        });
    });
});

router.get("/ItemUpdatePage/:id", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside item update request using router");
    console.log(req.params.id);
    Sections.findOne({
        sectionName : req.params.id
    })
    .then(response => {
        console.log("Response from the database for Menu : "+response)
        console.log(JSON.stringify(response))
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Error in adding sections'
        });
    });
});

router.post("/ItemUpdatePage", function(req,res) {
    console.log("Inside item update page request");
    console.log('Section Name to update : '+req.body.sectionsName);
    Sections.update(
        {sectionName : req.body.sectionsName, RestaurantName : req.body.restaurantName},
        {$set : {sectionName : req.body.sectionName,sectionDescription : req.body.sectionDesc}},
        {new : true},
        function(err, section) {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    message : 'Something went wrong'
                });
                return
            }
            console.log("New section name for item : "+req.body.sectionName);
            console.log("Old section name for item : "+req.body.sectionsName);
            Items.findOneAndUpdate(
                {SectionName : req.body.sectionsName},
                {$set : {SectionName : req.body.sectionName}}
            )
            .then(response => {
                console.log(response);
                res.json({
                    success : true,
                    message : 'Item Updated'
                });
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success : false,
                    message : 'Item not found'
                });
            });
        }
    );

    /*let sectionsName = req.body.sectionsName;
    let sectionName = req.body.sectionName;
    let sectionDesc = req.body.sectionDesc;
    let restaurantName = req.body.restaurantName;
    let sql = "UPDATE sections,items SET sections.sectionName = "+mysql.escape(sectionName)+", items.SectionName = "+mysql.escape(sectionName)+", sections.sectionDescription = "+mysql.escape(sectionDesc)+" WHERE sections.sectionName = "+mysql.escape(sectionsName)+ " AND sections.RestaurantName = "+mysql.escape(restaurantName)+" AND items.RestaurantName = "+mysql.escape(restaurantName)+" AND items.SectionName = "+mysql.escape(sectionsName);
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
                    //res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });*/
});

router.get("/SectionUpdatePage/:id", passport.authenticate('jwt',{ session : false }), function(req,res) {

    console.log("Inside item display request using router");

    console.log(req.params.id);
    Items.findOne({
        itemName : req.params.id
    })
    .then(response => {
        console.log("Response from the database for Menu : "+response)
        console.log(JSON.stringify(response))
        res.send(JSON.stringify(response));
    })
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Error in adding sections'
        });
    });
});

router.post("/SectionUpdatePage", passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log("Inside section add page request");

    console.log(req.body.itemsName);
    console.log(req.body.restaurantName);
    Items.findOneAndUpdate(
        {itemName : req.body.itemsName, RestaurantName : req.body.restaurantName},
        {$set : {itemName : req.body.itemName, description : req.body.itemDesc, itemprice : req.body.itemPrice}},
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
    .catch(err => {
        console.log(err);
        res.json({
            success : false,
            message : 'Error in adding sections'
        });
    });
});


module.exports = router;