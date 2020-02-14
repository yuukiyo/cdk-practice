import json

def handler(event, context):
    print(event)
    hoge = {
        'message': 'hello world!!'
    }
    return {
        'statusCode': 200,
        'body': json.dumps(hoge)
    }