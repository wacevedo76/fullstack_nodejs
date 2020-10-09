/*
 * Homework Assignment 1 - Hello World
 */

const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res){
  // Parse url
  const parsedURL = url.parse(req.url, true);
  // get path
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // Get the query string as an object

  if (trimmedPath == 'hello') {
    
    res.setHeader('Content-Type', 'applicatiion/json');
    res.writeHead(200);
    res.end(JSON.stringify( {message: 'Hello World!'} ));
  } else {
    res.setHeader('Content-Type', 'plain/text');
    res.writeHead(404);
    res.end('Content not found.')
  }
});

server.listen(3000, function() {
  console.log('listening on port 3000');
});
