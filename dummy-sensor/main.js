'use strict';
const DummySensor = require('./lib/DummySensor');

let sensor = new DummySensor({
  frequency: 500
});
sensor.onactivate = event => console.log('activated');
sensor.onchange = event => console.log(
  `${new Date(event.reading.timestamp).toLocaleTimeString()} ${event.reading.dummyValue}`
);
sensor.start();
setTimeout(
  () => {
    sensor.stop();
  },
  5000
);
