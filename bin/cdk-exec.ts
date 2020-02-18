#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { DynamoDBStack } from '../lib/dynamodb';
import { LambdaStack } from '../lib/lambda';
import { ApiGatewayStack } from '../lib/api-gateway';
import { S3Stack } from '../lib/s3';

const app = new cdk.App()
const dynamodb = new DynamoDBStack(app, 'DynamoDBStack')
const lambda = new LambdaStack(app, 'LambdaStack', {
    pizzaTableArn: dynamodb.pizzaTableArn,
    pizzaTableName: dynamodb.pizzaTableName
})

const apigateway = new ApiGatewayStack(app, 'ApiGatewayStack', {
    getPizzaLambdaHandler: lambda.getPizzaLambdaHandler
})

const s3 = new S3Stack(app, 'S3Stack', {
    hoge: 'hogehoge'
})
