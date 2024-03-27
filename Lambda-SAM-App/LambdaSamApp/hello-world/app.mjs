/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
export const lambdaHandler = async (event, context) => {
    console.log(event);
    var s3ObjectKey = event.Records[0].s3.object.key;
    var s3TimeStamp = event.Records[0].eventTime;
    
    var ddb = new DynamoDBClient({});
    const params = {
        TableName: '<TableNameGenerated>',
        Item: {
            'id': {S: s3ObjectKey},
            'timestamp': {S: s3TimeStamp}
        }
    };
    console.log(params)
    const command = new PutItemCommand(params);
    const response = await ddb.send(command);
    console.log(response)
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
