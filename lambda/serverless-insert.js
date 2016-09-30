var AWS = require('aws-sdk');
var DOC = require('dynamodb-doc');
var dynamo = new DOC.DynamoDB();
exports.handler = function(event, context) {
    if(event.UUID == "" || event.name == "" || event.email == "" || event.comments == "" ) {
        context.fail('invalid comment data');
    }
    var params = {
        TableName: "ServerlessDemo2016",
        Item: event
    };
    dynamo.putItem(params, function(err, data) {
        if(err) {
            context.fail(err);
        } else {
            context.done(null,"SUCCESS!");
        }
    });
};
