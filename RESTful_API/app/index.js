/* 
 * Primary file for the API
 *
 */

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respod to all request with a string

const server = http.createServer(function(req, res) {
  // get the url and parse it
  let parseURL = url.parse(req.url, true);

  // get the path
  let path = parseURL.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,'')

  // Get the query string as an object
  let queryStringObject = parseURL.query;

  //  Get the HTTP Method
  let method = req.method.toLowerCase();

  // Get the HTTP headers as an object
  let headers = req.headers;
                               
  // Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  
  req.on('end', function() {
    buffer += decoder.end();

    // Send the response
    res.end('Hello world\n');

    // log the request path
    console.log('The payload is: ', buffer);
  });
});

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000 now")
});

