'use strict';
const SensorState = {
  IDLE: Symbol('idle'),
  ACTIVATING: Symbol('activating'),
  ACTIVATED: Symbol('activated'),
  ERRORED: Symbol('errored')
}
module.exports = SensorState;
