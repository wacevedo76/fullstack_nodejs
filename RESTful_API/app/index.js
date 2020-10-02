/*
 * Primary file for the API
 *
 */

const http = require('http');
const url = require('url');

// The server should respod to all request with a string

const server = http.createServer(function(req, res) {
  // get the url and parse it
  let parseURL = url.parse(req.url, true);

  // get the path
  let path = parseURL.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,'')

  // Get the query string as an objec
  let queryStringObject = parseURL.query;

  //  Get the HTTP Method
  let method = req.method.toLowerCase();

  // Get the HTTP headers as an object
  let headers = req.headers;
                               
  // Send the response
  res.end('Hello world\n');

  // log the request path
  console.log('the headers are', headers);
  
})

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000 now")
});

