import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core';

export class DynamoDBStack extends cdk.Stack {
  public readonly pizzaTableArn: string;
  public readonly pizzaTableName: string;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pizzaTable = new dynamodb.Table(this, 'Pizza', {
      tableName: 'Pizza',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    })
    this.pizzaTableArn = pizzaTable.tableArn
    this.pizzaTableName = pizzaTable.tableName
  }
}
