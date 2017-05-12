## What this does
Receive a MQTT message from the Sensor Tag and converts it to data, inserting it into the devide bucket

## How to use on Tago
Do your own modifications if you want.<br>
Upload to Tago analysis, in the admin website.<br>
Add the environment variable `device_token` with the device token of your choice.
Configure the your sensor tag with MQTT service from tago using our documentation.

## How to run the analysis from your machine  
Make sure you have npm and node installed in your machine.<br>
Add the environment variable `device_token` with the device token of your choice, to the analysis configuration, in the admin website.<br>
Configure the your sensor tag with MQTT service from tago using our documentation.
Open the index.js, change `MY-ANALYSIS-TOKEN-HERE` line for your analysis token.<br>
Opens the terminal and run:

`npm install`<br>
`node .`

