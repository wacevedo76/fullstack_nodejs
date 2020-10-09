// Define the handlers
const handlers = {};

handlers.ping =  function(data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};
