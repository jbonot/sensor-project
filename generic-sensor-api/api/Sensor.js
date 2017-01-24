'use strict';

const uuid = require('uuid/v1');
const SensorState = require('./SensorState');

module.exports = class Sensor {
  constructor(sensorOptions) {
    this._id = uuid();
    this._sensorOptions = sensorOptions || {};
    if(this.sensorOptions.frequency === 'undefined') {
      this.sensorOptions.frequency = 500;
    }
    this._state = null;
    this._reading = null;
    this._onactivate = event => {};
    this._onchange = event => {};
    this._onerror = event => {};
  }
  set id(value) {
    this._id = value;
  }
  get id() {
    return this._id;
  }
  set sensorOptions(value) {
    this._sensorOptions = value;
  }
  get sensorOptions() {
    return this._sensorOptions;
  }
  set state(value) {
    this._state = value;
  }
  get state() {
    return this._state;
  }
  set reading(value) {
    this._reading = value;
  }
  get reading() {
    return this._reading;
  }
  set onactivate(value) {
    this._onactivate = value;
  }
  get onactivate() {
    return this._onactivate;
  }
  set onchange(value) {
    this._onchange = value;
  }
  get onchange() {
    return this._onchange;
  }
  set onerror(value) {
    this._onerror = value;
  }
  get onerror() {
    return this._onerror;
  }
  start() {
    this.state = SensorState.ACTIVATING;
    this.state = SensorState.ACTIVATED;
    this.onactivate();
    return this.handleStarted();
  }
  stop() {
    return this.handleStopped();
  }
}
