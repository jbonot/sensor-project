'use strict';

const Sensor = require('generic-sensor-api').Sensor;
const DummySensorReading = require('./DummySensorReading');

module.exports = class DummySensor extends Sensor {
  constructor(sensorOptions) {
    super(sensorOptions);
    this._intervalHandle = null;
    this._isAMock = true;
  }
  set name(value) {
    this._name = value;
  }
  get name() {
    return this._name;
  }
  set location(value) {
    this._location = value;
  }
  get location() {
    return this._location;
  }
  set formula(value) {
    this._formula = value;
  }
  get formula() {
    return this._formula;
  }
  set isAMock(value) {
    this._isAMock = value;
  }
  get isAMock() {
    return this._isAMock;
  }

  handleStarted() {
    return new Promise((resolve, reject) => {
      if (this._isAMock) {
      this._intervalHandle = setInterval(
          () => {
                    this._reading = new DummySensorReading(
                      this._name,
                      Date.now(),
                      this._formula()
                    )

              this.onchange({
                  reading: this._reading
              });
          },
          this.sensorOptions.frequency
      );
    }
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
