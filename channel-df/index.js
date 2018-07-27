const https = require('https');

exports.handler = (event, context, callback) => {
    
    var request = JSON.parse(event.body);
    
    const model = {
      parameters: [{
        symbol: request.queryResult.parameters.symbol,
        name: request.queryResult.parameters.symbol
      }]
    };
    
    var payload = JSON.stringify(model);

    var options = {
        host: 'hzx4iwutci.execute-api.us-east-1.amazonaws.com',
        path: '/default/intent-handler',
        port: 443,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length
        }
    };

    var cb = (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (d) => body += d);
        res.on('end', () => {
            callback(null, {
                "statusCode": 200,
                "body": JSON.stringify({
                    "fulfillmentText": body,
                }),
                "isBase64Encoded": false
            });
        });
    };
    
    https.request(options, cb).write(payload);
};