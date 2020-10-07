/*
 *
 * Homework Assignment 1 - Hello World
 *
 */

const http = require('http');
const url = require('url');

const helloData = {
  'Hello' : 'World'
};

const server = http.createServer(function(req, res){
  // Parse url
  const parsedURL = url.parse(req.url, true);
  // return response to browser
  res.end(parsedURL);
});

server.listen(3000, function() {
  console.log('listening on port 3000');
});
