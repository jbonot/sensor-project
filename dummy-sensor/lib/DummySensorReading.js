'use strict';
const SensorReading = require('generic-sensor-api').SensorReading;

// Different readings for different types of sensors.

module.exports = class DummySensorReading extends SensorReading {
  constructor(name, timestamp, value) {
    super(timestamp);
    this._dummyValue = value;
    this._name = name;
  }

  get dummyValue() {
    return this._dummyValue;
  }
  set dummyValue(value) {
    this._dummyValue = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}
