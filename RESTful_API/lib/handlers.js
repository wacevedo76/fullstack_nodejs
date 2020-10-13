/*
* Request handlers
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');

// Define the handlers
const handlers = {};

// Users
handlers.users = function(data, callback){
  const acceptableMethods = ['post', 'get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true > 0 ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    // Make suer that the user doesnt already exists
    _data.read('users', phone, function(err,data){
      if(err){
        // Hash the password
        const hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          const userObject = {
            'firstName' : firstName,
            'lastNamea' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',phone,userObject,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500, {'Error' : 'Could not create new user'});
            }
          });
        } else {
          callback(500, {'Error' : 'Could not hash the users password'});
        }

      } else {
        // User already exists
        callback(400, {'Error' : 'A user with that phone number already exists'});
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
handlers.ping = function(data, callback) {
  callback(200);
};

// Not Found handler
handlers.notFound = function(data,callback){
  callback(404);
};

//Export the module
module.exports = handlers
