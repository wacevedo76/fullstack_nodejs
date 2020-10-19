/*
 * Helpers for various tasks
 */

// Dependencies
const crypto = require('crypto');
const config = require('../lib/config');

// Helpers containers
const helpers = {};

// Create a SHA256 hash
helpers.hash = function(str) {
  if(typeof(str) == 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    console.log('could not hash password');
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing 
  helpers.parseJsonToObject = function(str){
    try{
      let obj = JSON.parse(str);
      return obj;
    }catch(e){
      return {};
    }
  };

// Export modules
module.exports = helpers;
