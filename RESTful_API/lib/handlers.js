/*
 * Request handlers
 */

// Dependencies
const _data = require('./data');

// Define the handlers
const handlers = {};

// Users
handlers.users = function(data, callback) {
  const acceptableMehtods = ['post', 'get', 'put', 'delete'];
  if(acceptableMehtods.indexOf(data.module) > -1){
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement) {
    // Make sure that the user doesn't already exist'
    _data.read('users', phone, function(err, data){
      if(err) {
-------------------------------> TIME: 16:10 <----------------------------------        
      } else {
        // User already exists
        callback(400, {'Error' : 'a user with that phone number already exists.'} );
      }
    });
  } else {
    callback(400, {'Error' : 'Missing required fields'});
  }
};

// Users - get
handlers._users.get = function(data,callback){

};

// Users - put
handlers._users.put = function(data,callback){

};

// Users - delete
handlers._users.delete = function(data,callback){

};

// Ping handler
handlers.ping =  function(data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

module.exports = handlers
