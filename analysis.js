const Analysis = require('tago/analysis');
const Device   = require('tago/device');
const Utils    = require('tago/utils');

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

/**
* Main function called by tago analysis
*/
function sensorTagParse(context, scope) {
  // Use tago library to convert the environment variables to json
  // and check if the variables are correct
  const env_var = Utils.env_to_obj(context.environment);
  if (!env_var.device_token) return context.log('Was not possible to found device_token in the environment variable');

  // Try to find the payload in the scope. Scope is passed by MQTT to the analysis
  let payload;
  try {
    payload = JSON.parse(scope[0]);
  } catch (error) {
    return context.log(error);
  }

  if (!payload) return context.log('Cant find variable "payload" in scope. Try running the analysis using actions');


  // create a new serie based in date time
  const serie = new Date().getTime();

  // transform each part of the scope in a variable formated json
  payload = Object.keys(payload).map((x) => {
    return {
      variable: x,
      value: parseValue(payload[x]),
      serie: String(serie),
    };
  });

  // Create the device object using the environment variable device_token
  const mydevice = new Device(env_var.device_token);

  // Insert payload and return its succesfull or fail to the tago analyisis
  mydevice.insert(payload).then(context.log).catch(context.log);
}

module.exports = new Analysis(sensorTagParse, 'YOUR-ANALYSIS-TOKEN-HERE');
