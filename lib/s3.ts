import * as s3 from '@aws-cdk/aws-s3'
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core';

interface S3StackProps extends cdk.StackProps {
  hoge: string
}

export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: S3StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'webHostingBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    // const deploy = new s3Deployment.BucketDeployment(this, 'webHostingDeployment', {
    //   sources: [s3Deployment.Source.asset('./website-src')],
    //   destinationBucket: bucket
    // })

    // オリジンアクセスアイデンティティ
    const oai = new cloudfront.OriginAccessIdentity(this, 'oai', {
      comment: 's3 access'
      // cloudFrontOriginAccessIdentityConfig: {
      //   comment: 's3 access'
      // }
    })

    const policy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals: [new iam.CanonicalUserPrincipal(oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      resources: [
        bucket.bucketArn + '/*'
      ]
    })
    bucket.addToResourcePolicy(policy)

    const dist = new cloudfront.CloudFrontWebDistribution(this, 'dist', {
      defaultRootObject: 'index.html',
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: oai
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              minTtl: cdk.Duration.seconds(0),
              maxTtl: cdk.Duration.days(365),
              defaultTtl: cdk.Duration.days(1)
            }
          ]
        }
      ],
      errorConfigurations: [
        {
          errorCode: 403,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html'
        }
      ]
    })
  }
}
