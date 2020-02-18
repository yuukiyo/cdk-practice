import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core';

interface ApiGatewayStackProps extends cdk.StackProps {
  getPizzaLambdaHandler: lambda.Function
}

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'pizza-api', {
      restApiName: 'pizza',
      endpointTypes: [
        apigateway.EndpointType.REGIONAL
      ]
    })
    const pizza = api.root.addResource('pizza');
    const getPizzaIntegration = new apigateway.LambdaIntegration(props.getPizzaLambdaHandler)
    pizza.addMethod('GET', getPizzaIntegration)
  }
}
