import fs from 'fs';
const request = require('request');
class Main {
    home(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const myReadStream = fs.createReadStream('./public/index.html', 'utf8');
        myReadStream.pipe(res);
    }
    message(req, res) {
        const {query} = req._parsedUrl;
        const message = query.substr(1);
        
        const url = 'http://neuralconvo-ec2.huggingface.co/hey?q='+message; 
          const promArr = [];
          for (let i = 0; i < 5; i++) {
              promArr.push( new Promise((resolve, reject) => {
                request({
                    method: 'GET',
                    url: url,
                    qs: {
                        param: 'edit',
                        value: 100
                    }
                    }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve(body);
                    }
                    })
              }));
          }
          Promise.all(promArr).then(values => { 
            const answer = values.filter(function(item) {
                return values.hasOwnProperty(item) ? false : (values[item] = true);
            });
            res.send(answer); 
          });
        
    }

};

export const main = new Main();