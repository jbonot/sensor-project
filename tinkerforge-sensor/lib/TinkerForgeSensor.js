'use strict';

const Sensor = require('generic-sensor-api').Sensor;
const TinkerForgeSensorReading = require('./TinkerForgeSensorReading');

module.exports = class TinkerForgeSensor extends Sensor {

  constructor(sensorOptions) {
    super(sensorOptions);
    this._intervalHandle = null;
  }

  handleStarted() {
    return new Promise((resolve, reject) => {
      this._intervalHandle = setInterval(
          () => {
              let tinkerForgeSensorReading = new TinkerForgeSensorReading(
                  Date.now(),
                  Math.random()
              )
              this.onchange({
                  reading: tinkerForgeSensorReading
              });
          },
          this.sensorOptions.frequency
      );
      resolve();
    });
  }

  handleStopped() {
      return new Promise((resolve, reject) => {
        clearInterval(this._intervalHandle);
        resolve();
      });
  }
}
