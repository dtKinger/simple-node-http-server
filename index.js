const http = require('node:http')
const url = require('node:url')
const fs = require('node:fs')

http.createServer((req, res) => {
  let reqUrl = url.parse(req.url).pathname
  if (reqUrl.includes('favicon')) { // temp hack
    return;
  } else if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index';
    getHtmlFile(reqUrl)
  } else if (req.url == '/style.css') {
      res.setHeader('Content-type', 'text/css');
      res.write(fs.readFileSync('style.css'));
      res.end();
  } else {
    getHtmlFile(reqUrl)
  }

  function getHtmlFile(reqUrl){
    fs.readFile(`./${reqUrl}.html`, (err, data) => {
      if (err) {
        res.writeHead(404);
        notFound = fs.readFile('./404.html', (err, notFound) => {
          console.error(err);
          res.end(notFound);
        })
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    })
  }
}).listen(8080)

