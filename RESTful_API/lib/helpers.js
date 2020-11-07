/*
 * Helpers for various tasks
 */

// Dependencies
const crypto = require('crypto');
const config = require('../lib/config');
const https = require('https');
const querystring = require('querystring');

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

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
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

// Send SMS message via Twilio
helpers.sendTwilioSms = function(phone,msg,callback){
  // Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim(). length <= 1600 ? msg.trim() : false;
  if(phone && msg){
    // Configure the request payload
     const payload = {
       'From' : config.twilio.fromPhone,
       'To' : '+1'+phone,
       'Body' : msg
     };

    // Stringify the payload
    const stringPayload = querystring.stringify(payload);
    
    // Configure the request details
    const requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.twilio.com',
      'method' : 'POST',
      'path' : '/2010-04-01/Accounts/'+config.twilio.accoutSid+'Messages.json',
      'auth' : config.twilio.accoutSid+':'+config.twilio.authToken,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(stringPayload)
      }
    };

    // Instantiat the request object
    const req = https.request(requestDetails,function(res){
      // Grab the status of the sent request
      const status = res.statusCode;
      // Callback successfully if the request went through
      if(status == 200 || status == 201){
        callback(false);
      } else {
        callback('Status code returned was '+status)
      }
    });

    // bind to the error event so it doesn't get thrown' 
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};
