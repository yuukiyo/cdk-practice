#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkPracticeStack } from '../lib/cdk-practice-stack';

const app = new cdk.App();
new CdkPracticeStack(app, 'CdkPracticeStack');
