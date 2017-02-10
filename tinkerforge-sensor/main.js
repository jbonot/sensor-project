'use strict';
const TinkerForgeSensor = require('./lib/TinkerForgeSensor');

let sensor = new TinkerForgeSensor({
  frequency: 500
});
sensor.onactivate = event => console.log('activated');
sensor.onchange = event => console.log(
  `${new Date(event.reading.timestamp).toLocaleTimeString()} ${event.reading.inputValue}`
);
sensor.start();
setTimeout(
  () => {
    sensor.stop();
  },
  5000
);
