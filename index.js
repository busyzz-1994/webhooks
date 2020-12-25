const http = require('http');
const crypto = require('crypto');
const secret = 'qq540548050';
const {spawn} = require('child_process');
function getCrypto(body) {
  return 'sha1=' + crypto.createHmac('sha1', secret).update(body).digest('hex');
}
http
  .createServer((req, res) => {
    console.log('enter_req');
    if (req.method === 'GET' && req.url === '/test') {
      console.log('enter test');
      let child = spawn('sh', [`./blog-music.sh`]);
    }
    //监听github接口调用
    if (req.method === 'POST' && req.url === '/webhook') {
      console.log('enter_webhook');
      let buffer = [];
      req.on('data', (data) => {
        buffer.push(data);
      });
      req.on('end', () => {
        console.log('end');
        const body = Buffer.concat(buffer);
        const event = req.headers['x-github-event'];
        const sign = req.headers['x-hub-signature'];
        if (sign !== getCrypto(body)) {
          console.log('sin not');
          res.end('Not Allowed');
          return;
        }
        if (event === 'push') {
          console.log('pushevent');
          // res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({code: 0}));
          let payload = JSON.parse(body);
          let repositoryName = payload.repository.name;
          console.log(repositoryName, 'repositoryName');
          let child = spawn('sh', [`./${repositoryName}.sh`]);
          let buffers = [];
          child.stdout.on('data', (data) => {
            buffers.push(data);
          });
          child.stdout.on('end', () => {
            let log = Buffer.concat(buffers);
            console.log(log.toString());
          });
        }
      });
    }
    res.end('ok');
  })
  .listen(4001);
