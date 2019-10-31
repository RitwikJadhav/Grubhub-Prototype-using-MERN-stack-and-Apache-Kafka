const mongoose = require('mongoose');
const Items = require('../models/itemModel');

function handle_request(msg, callback){

    console.log('Inside display search results in kafka backend');

    Items.find({
        itemName : msg.itemToSearch
    })
    .then(response => {
        console.log("Response from the database for Menu : "+response)
        callback(null,response);
    })
    .catch(err => {
        console.log(err);
        callback(null,err);
    });
};  

exports.handle_request = handle_request;