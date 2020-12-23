const http = require('http');

http
  .createServer((req, res) => {
    console.log('mount');
    //监听github接口调用
    if (req.method === 'POST' && req.url === 'webhooks') {
    }
    console.log(req);
    res.end('ok');
  })
  .listen(4001);
