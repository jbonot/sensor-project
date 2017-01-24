'use strict';
module.exports = class SensorReading {
  constructor(timestamp) {
    this._timestamp = timestamp;
  }

  get timestamp() {
    return this._timestamp;
  }
  set timestamp(value) {
    this._timestamp = value;
  }
}
