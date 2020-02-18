import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import { Role, Policy, ServicePrincipal, PolicyStatement, IManagedPolicy, ManagedPolicy } from '@aws-cdk/aws-iam'
import * as path from 'path'
import { Duration } from '@aws-cdk/core';

interface LambdaStackProps extends cdk.StackProps {
  pizzaTableArn: string
  pizzaTableName: string
}

export class LambdaStack extends cdk.Stack {
  public readonly getPizzaLambdaHandler: lambda.Function
  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // ポリシーステートメントの定義
    const policyStatement = new PolicyStatement({
      resources: [props.pizzaTableArn],
      actions: ['dynamodb:*']
    })

    // 管理ポリシー作成
    const PizzaTableFullAccess = new ManagedPolicy(this, 'PizzaTableFullAccess', {
      managedPolicyName: 'PizzaTableFullAccess',
      statements: [policyStatement]
    })

    // Lambda実行のIAMロールを作成
    const getPizzaFuncRole = new Role(this, 'getPizzaFuncRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    })
    getPizzaFuncRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))
    getPizzaFuncRole.addManagedPolicy(PizzaTableFullAccess)

    // Lambda関数
    this.getPizzaLambdaHandler = new lambda.Function(this, 'getPizza', {
      runtime: lambda.Runtime.PYTHON_3_8,
      functionName: 'getPizza',
      memorySize: 256,
      role: getPizzaFuncRole,
      timeout: Duration.seconds(10),
      handler: 'lambda-function.handler',
      environment: {
        'PIZZA_TABLE_NAME': props.pizzaTableName
      },
      code: lambda.Code.fromAsset(path.join(__dirname, 'getPizzaLambdaHandler'))
    })
  }
}
