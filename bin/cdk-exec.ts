#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { DynamoDBStack } from '../lib/dynamodb';
import { ApiGatewayStack } from '../lib/api-gateway';

const app = new cdk.App();
const dynamodb = new DynamoDBStack(app, 'DynamoDBStack');
new ApiGatewayStack(app, 'ApiGatewayStack', {
    pizzaTableName: dynamodb.pizzaTableName
});
