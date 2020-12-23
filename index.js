const http = require('http');

http
  .createServer((req, res) => {
    console.log('mount');
    console.log(req);
    //监听github接口调用
    if (req.method === 'POST' && req.url === 'webhook') {
      console.log(req);
      console.log('enter');
    }
    res.end('ok');
  })
  .listen(4001);
