/* 
 * Primary file for the API
 *
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('../lib/config');
const fs = require('fs');
const handlers = require('../lib/handlers');
const helpers = require('../lib/helpers');

// Instantiate the HTTP server
const httpServer = http.createServer(function(req, res) {
  unifiedServer(req,res);
});

// Start the server, and have it listen on port 3000
httpServer.listen(config.httpPort, function(){
  console.log(`The server is running on ${config.httpPort}`);
});

// Instantiate the HTTPS server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req,res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function(){
  console.log(`The server is running on ${config.httpsPort}`);
});


// All the server logic for both the http and https server
const unifiedServer = function(req,res) {
  // get data needed for RESTful request, create dataobject with all needed data
  // get the url and parse it
  let parsedURL = url.parse(req.url, true);

  // get the path
  let path = parsedURL.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,'')

  // Get the query string as an object
  let queryStringObject = parsedURL.query;

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

    // Construct the data object to go to the handler
    const data  = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    };

    // Choose the handler this request should go to. If non found, choose 'not found'
    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload){
      // Use the status code called back by the hander, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      
      // Use the payload called by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Conver teh payload to a string
      const payloadString = JSON.stringify(payload);

      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
 
      // log the request path
      console.log("returning the response: ", statusCode, payloadString);
    });
  });
};

// Define a request router
const router = {
  'ping' : handlers.ping,
  'users' : handlers.users
};
