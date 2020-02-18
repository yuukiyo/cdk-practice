import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import * as cdk from '@aws-cdk/core';

interface S3StackProps extends cdk.StackProps {
  hoge: string
}

export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: S3StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'webHostingBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const deploy = new s3Deployment.BucketDeployment(this, 'webHostingDeployment', {
      sources: [s3Deployment.Source.asset('./website-src')],
      destinationBucket: bucket
    })
  }
}
