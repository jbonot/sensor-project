'use strict';
const SensorReading = require('generic-sensor-api').SensorReading;

module.exports = class DummySensorReading extends SensorReading {
  constructor(timestamp, value) {
    super(timestamp);
    this._dummyValue = value;
  }

  get dummyValue() {
    return this._dummyValue;
  }
  set dummyValue(value) {
    this._dummyValue = value;
  }
}
