const Analysis = require('tago/analysis');
const Device   = require('tago/device');
const Utils    = require('tago/utils');

// The function myAnalysis will run when you execute your analysis
function myAnalysis(context, scope) {
  // reads the values from the environment and saves it in the variable env_vars
  const env_vars = Utils.env_to_obj(context.environment);
  if (!env_vars.device_token) return context.log('The device_token was not found in the environment variables');

  // Try to find the payload in the scope. Scope is passed by MQTT to the analysis
  let payload;
  try {
    payload = JSON.parse(scope[0]);
  } catch (error) {
    return context.log(error);
  }

  if (!payload) return context.log('Cant find variable "payload" in the scope. Try running the analysis using actions');


  // create a new serie based in date time
  const serie = new Date().getTime();

  /**
  * Function to convert a string number from MQTT to Number
  * Return string if it is not a number
  */
  function parseValue(value) {
    const number = Number(value);
    if (Number.isNaN(number)) {
      return value;
    }
    return number;
  }

  // transform each part of the scope in a variable formated json
  payload = Object.keys(payload).map((x) => {
    return {
      variable: x,
      value: parseValue(payload[x]),
      serie: String(serie),
    };
  });

  // Create the device object using the environment variable device_token
  const mydevice = new Device(env_vars.device_token);

  // Insert the payload and return the result to Tago Analysis console
  mydevice.insert(payload).then(context.log).catch(context.log);
}

module.exports = new Analysis(myAnalysis, 'YOUR-ANALYSIS-TOKEN-HERE');
