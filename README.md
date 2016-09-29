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

`aws s3api put-bucket-policy --bucket serverless-demo2016 --policy file://s3-policy.json`

Test it by opening your browser and pasting: where your bucket name replaces 'serverless-demo2016':

`http://serverless-demo2016.s3-website-us-east-1.amazonaws.com`
