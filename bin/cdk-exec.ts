#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { ApiGatewayStack } from '../lib/api-gateway';

const app = new cdk.App();
new ApiGatewayStack(app, 'CdkPracticeStack');
