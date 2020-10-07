/*
 *
 * Homework Assignment 1 - Hello World
 *
 */
const http = require('http');
const url = require('url');

// instantiate server
const server = http.createServer(function(req, res) {
  // parse and trim url
  const parsedURL = url.parse(req.url, true);
  // get path
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  
});

server.listen(3000, function(){
  console.log('server started on 3000')
});

const handlers = {};
handlers.home = function(data, callback) {
  callback(200);
};

handlers.notFound = function(data, callback) {
  callback(404);
};

const router = {
  'hello' : handlers.hello
};
