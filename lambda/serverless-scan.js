var AWS = require('aws-sdk');
var DOC = require('dynamodb-doc');
var dynamo = new DOC.DynamoDB();

exports.handler = function(event, context) {
    var params = {TableName: "ServerlessDemo2016"};
    dynamo.scan(params, function(err, data) {
        if(err) {
            context.done('Unable to retrieve data', err);
        } else {
            context.done(null,data.Items);
        }
    });
};
