//topics files
//var signin = require('./services/signin.js');
var createUser = require('./services/createUser');
var createUserOwner = require('./services/createUserOwner');
var getProfileBuyer = require('./services/getProfileBuyer');
var updateProfileBuyer = require('./services/updateProfileBuyer');
var updateProfileOwner = require('./services/updateProfileOwner');
var createItem = require('./services/createItem');
var createSection = require('./services/createSection');
var getMenu = require('./services/getMenu');
var deleteItem = require('./services/deleteItem');
var deleteSection = require('./services/deleteSection');
var getSections = require('./services/getSections');
var getItems = require('./services/getItems');
var updateSection = require('./services/sectionUpdate');
var getSearchedItems = require('./services/itemToSearch');
var updateItem = require('./services/itemUpdate');
var getRestaurantSections = require('./services/getRestaurantSections');
var getRestaurantItems = require('./services/getRestaurantItems');
var getRestaurantOrders = require('./services/getOrderForRestaurant');
var createOrders = require('./services/createOrders');
var updateOrderStatus = require('./services/updateOrder');
var getActiveOrders = require('./services/getActiveOrders');
var getDeliveredOrders = require('./services/getDeliveredOrders');
var sendMessage = require('./services/sendMessage');
var getMessage = require('./services/getMessage');
var sendReply = require('./services/sendReply');
var getReply = require('./services/getReply');
const mongoose = require('mongoose');
var connection = require('./kafka/Connection');

mongoose.connect('mongodb+srv://root:ritwik@grubhub-pqhor.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true
},{
    userMongoClient : true
},{
    useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false);

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Backend : Server is running ');
    console.log('Topic Request handler attached with ',topic_name);
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('Request has been handled by the Kafka server');
            console.log('After Request is handled in Kafka : '+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log('Kafka-Backend : Inside server file : '+data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("create_user",createUser);
handleTopicRequest("create_user_owner",createUserOwner);
handleTopicRequest("get_profile_buyer",getProfileBuyer);
handleTopicRequest("update_profile_buyer",updateProfileBuyer);
handleTopicRequest("update_profile_owner",updateProfileOwner);
handleTopicRequest("create_item",createItem);
handleTopicRequest("create_section",createSection);
handleTopicRequest("create_orders",createOrders);
handleTopicRequest("get_menu",getMenu);
handleTopicRequest("get_sections",getSections);
handleTopicRequest("get_items",getItems);
handleTopicRequest("get_searched_items",getSearchedItems);
handleTopicRequest("get_restaurant_sections",getRestaurantSections);
handleTopicRequest("get_restaurant_items",getRestaurantItems);
handleTopicRequest("get_order_restaurant",getRestaurantOrders);
handleTopicRequest("get_active_orders",getActiveOrders);
handleTopicRequest("get_delivered_orders",getDeliveredOrders);
handleTopicRequest("delete_item",deleteItem);
handleTopicRequest("delete_section",deleteSection);
handleTopicRequest("update_section",updateSection);
handleTopicRequest("update_item",updateItem);
handleTopicRequest("update_order_status",updateOrderStatus);
handleTopicRequest("send_message",sendMessage);
handleTopicRequest("get_message",getMessage);
handleTopicRequest("send_reply",sendReply);
handleTopicRequest("get_reply",getReply);

