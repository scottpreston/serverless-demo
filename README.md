# Serverless Demo

A simple example of going serverless on AWS with instructions.

Prerequisites

1. Have an AWS Account
2. Install AWS Command Line Tools (AWS-CLI) - https://aws.amazon.com/cli/

## S3 Setup

First, create your S3 bucket.

`aws s3 mb s3://serverless-demo2016`

Go to the AWS Console and verify it created your bucket, or type:

`aws s3 ls`

Second, modify your bucket permissions to allow for web access.

`aws s3 website s3://serverless-demo2016 --index-document index.html`

Third, upload/sync your site content with s3.

`aws s3 sync ./s3 s3://serverless-demo2016`

Finally, update the security policy document for the bucket.

`aws s3api put-bucket-policy --bucket serverless-demo2016 --policy file://./s3/s3-policy.json`

Test it by opening your browser and pasting: where your bucket name replaces 'serverless-demo2016':

`http://serverless-demo2016.s3-website-us-east-1.amazonaws.com`

## Dynamo DB Setup

First, create the table:

` aws dynamodb create-table \
    --table-name ServerlessDemo2016 \
    --attribute-definitions \
        AttributeName=uuid,AttributeType=S \
    --key-schema AttributeName=uuid,KeyType=HASH\
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1`

Some more details:

The Table Name : **ServerlessDemo2016**
The Attributes (Key) : **uuid**

DynamoDB supports **key-value** as well as **document** data structures. So when creating a table in
DynamoDB, we need to create table with it's key column, then we can put whatever document we see fit inside
along with that **key**.

Second, put an item (document), in this table.

`aws dynamodb put-item --table-name ServerlessDemo2016 --item file://./dynamo/dynamo-sample-document.json`

Third, query the table:

`aws dynamodb scan --table-name ServerlessDemo2016`

## Lambda Setup

First create your lambda code, this is a Java or JavaScript function. Then upload it to AWS:

`aws lambda create-function \
--function-name serverless-demo2016-scan \
--zip-file fileb://lambda/serverless-scan.js.zip \
--role arn:aws:iam::xxxxxxxxxxxxxx:role/lambda_dynamo \
--handler serverless-scan.handler \
--runtime nodejs4.3`

Now test your function:

`aws lambda invoke --function-name serverless-demo2016-scan /dev/stdout`
