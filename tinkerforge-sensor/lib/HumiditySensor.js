'use strict';

const TinkerForgeSensor = require('./TinkerForgeSensor');

module.exports = class HumiditySensor extends TinkerForgeSensor {

  constructor(sensorOptions) {
    super(sensorOptions);
    this._intervalHandle = null;
  }
}
