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
    const hash = crypto.cre config.hashingSecret).update(str).digest('hex');
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

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789[](){}<>?!:;*&^%$#@';
    
    let str = '';
    for(let i = 1; i <= strLength; i++){
      // Get a random character from the possible characters
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));

      // Append this character to the final string
      str+=randomCharacter;
    };
    // Return string
    return str;
  } else {
    return false;
  }
};

// Export modules
module.exports = helpers;
