import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda'
import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core';
import * as path from 'path'

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pizzaTable = new dynamodb.Table(this, 'Pizza', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    })

    const getCdkTestLambdaHandler = new lambda.Function(this, 'cdk-test-lambda', {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'lambda-function.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'cdk-test-lambda'))
    })

    const api = new apigateway.RestApi(this, 'pizza-api', {
      restApiName: 'pizza',
      endpointTypes: [
        apigateway.EndpointType.REGIONAL
      ]
    })
    const pizza = api.root.addResource('pizza');
    const getPizzaIntegration = new apigateway.LambdaIntegration(getCdkTestLambdaHandler)
    pizza.addMethod('GET', getPizzaIntegration)
  }
}
