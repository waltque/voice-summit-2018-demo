const https = require('https');

exports.handler = (event, context, callback) => {
    
    var model = JSON.parse(event.body);
    
    const slot = model.parameters[0];
    const name = slot.name;
    const symbol = slot.symbol;
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=' + symbol + '&tsyms=BTC,USD,EUR';

    https.get(url, (res) => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', function (d) {
          body += d;
        });
        res.on('end', function () {
          let speechText = '';
          let data = JSON.parse(body);
          if (data.Response && data.Response == 'Error') {
            speechText = `Sorry, we could not find ${name}, please specify the correct symbol (i.e., ETH, BTC, LTC, etc...)`;
          } else {
            speechText = `${name} is ${data.USD} USD (${data.EUR} EUR${(symbol != 'BTC') ? ', ' + data.BTC + ' BTC': ''})`
          }
          
          var response = {
              "statusCode": 200,
              "body": speechText,
              "isBase64Encoded": false
          };
          
          callback(null, response);
        });
    });

};