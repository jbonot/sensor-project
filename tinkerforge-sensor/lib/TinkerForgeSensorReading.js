'use strict';
const SensorReading = require('generic-sensor-api').SensorReading;

module.exports = class TinkerForgeSensorReading extends SensorReading {
  constructor(timestamp, value) {
    super(timestamp);
    this._inputValue = value;
  }

  get inputValue() {
    return this._inputValue;
  }
  set inputValue(value) {
    this._inputValue = value;
  }
}
