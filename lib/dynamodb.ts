import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core';

export class DynamoDBStack extends cdk.Stack {
  public readonly pizzaTableName: string;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pizzaTable = new dynamodb.Table(this, 'Pizza', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    })
    this.pizzaTableName = pizzaTable.tableName
  }
}
