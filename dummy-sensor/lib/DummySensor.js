'use strict';

const Sensor = require('generic-sensor-api').Sensor;
const DummySensorReading = require('./DummySensorReading');

module.exports = class DummySensor extends Sensor {

  constructor(sensorOptions) {
    super(sensorOptions);
    this._intervalHandle = null;
  }

  set name(value) {
    this._name = value;
  }
  get name() {
    return this._name;
  }

  set startValue(value) {
    this._startValue = value;
  }
  get startValue() {
    return this._startValue;
  }

  set formula(value) {
    this._formula = value;
  }
  get formula() {
    return this._formula;
  }

  handleStarted() {
    return new Promise((resolve, reject) => {
      this._intervalHandle = setInterval(
          () => {
                  this._reading = new DummySensorReading(
                  Date.now(),
                  this._formula()
              )
              this.onchange({
                  reading: this._reading
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
