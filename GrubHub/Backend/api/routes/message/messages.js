const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');

const Messages = require('../../models/messageModel');

router.post('/SendMessage', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside message send request');
    const messages = new Messages({
        _id : new mongoose.Types.ObjectId(),
        sender : req.body.sender,
        receiver : req.body.receiver,
        message : req.body.message,
        date : req.body.date
    })

    messages.save()
    .then(response => {
        console.log(response);
        if(!response) {
            res.json({
                success : false,
                message : 'Message not saved'
            });
        }
        else {
            console.log(response);
            res.json({
                success : true,
                message : 'Message saved successfully'
            })
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

router.post('/ReceivedMessages', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside receive messages request');
    Messages.find({
        receiver : req.body.restaurantName
    })
    .then(response => {
        console.log(response);
        if(!response) {
            res.json({
                success : false,
                message : 'Messages not received'
            });
        }
        else {
            console.log(response);
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

router.post('/SendReply', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside message send request');
    const messages = new Messages({
        _id : new mongoose.Types.ObjectId(),
        sender : req.body.sender,
        receiver : req.body.receiver,
        message : req.body.message
    })

    messages.save()
    .then(response => {
        console.log(response);
        if(!response) {
            res.json({
                success : false,
                message : 'Reply not saved'
            });
        }
        else {
            console.log(response);
            res.json({
                success : true,
                message : 'Reply saved successfully'
            })
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

router.post('/ReceivedReply', passport.authenticate('jwt',{ session : false }), function(req,res) {
    console.log('Inside message reply request');

    Messages.find({
        sender : req.body.restaurantName
    })
    .then(response => {
        console.log(response);
        if(!response) {
            res.json({
                success : false,
                message : 'Messages not received'
            });
        }
        else {
            console.log(response);
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