const http = require('http');
const crypto = require('crypto');
const secret = 'qq540548050';
const {spawn} = require('child_process');
function getCrypto(body) {
  return 'sha1=' + crypto.createHmac('sha1', secret).update(body).digest('hex');
}
http
  .createServer((req, res) => {
    //监听github接口调用
    if (req.method === 'POST' && req.url === '/webhook') {
      let buffer = [];
      req.on('data', (data) => {
        buffer.push(data);
      });
      req.on('end', () => {
        const body = Buffer.concat(buffer);
        const event = req.headers['x-github-event'];
        const sign = req.headers['x-hub-signature'];
        if (sign !== getCrypto(body)) {
          res.end('Not Allowed');
          return;
        }
        if (event === 'push') {
          // res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({code: 0}));
          let payload = JSON.parse(body);
          console.log(payload);
          // spawn('sh',)
        }
      });
    }
    res.end('ok');
  })
  .listen(4001);
