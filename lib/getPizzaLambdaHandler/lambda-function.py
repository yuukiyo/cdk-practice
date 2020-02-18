import json
import boto3
import os
import uuid

def handler(event, context):
    item = {
        "id": str(uuid.uuid4()),
        "hoge": "hogehoge"
    }
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ.get('PIZZA_TABLE_NAME'))
    result = table.put_item(Item=item)
    print(result)
    print(event)
    hoge = {
        'message': 'hello world!!'
    }
    return {
        'statusCode': 200,
        'body': json.dumps(hoge)
    }