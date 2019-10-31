var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
    console.log('Backend Client : Inside make request');
    console.log('Message to be sent : ' +msg_payload);
	rpc.makeRequest(queue_name, msg_payload, function(err, response){

		if(err) {
			console.log("Error has occurred in make request");
			console.error(err);
		}
		else{
			console.log("Response from Kafka Backend : ", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;