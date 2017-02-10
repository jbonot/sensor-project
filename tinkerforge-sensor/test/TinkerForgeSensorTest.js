'use strict';
const assert = require('assert');
const TinkerForgeSensor = require('../lib/TinkerForgeSensor');
const TinkerForgeSensorReading = require('../lib/TinkerForgeSensorReading');

describe('TinkerForgeSensor', () =>
{
    it('should create a TinkerForge sensor', () =>
    {
        let tinkerforgeSensor = new TinkerForgeSensor();
        assert.equal(tinkerforgeSensor instanceof TinkerForgeSensor, true);
    });
    it('should start and stop', done =>
    {
        let tinkerforgeSensor = new TinkerForgeSensor();
        tinkerforgeSensor
          .start()
          .then(() => {
            tinkerforgeSensor.stop();
            done();
          });
    });
    it('should read a value', done =>
    {
        let tinkerforgeSensor = new TinkerForgeSensor();
        tinkerforgeSensor
          .start()
          .then(() => {
            setTimeout(() => {
              tinkerforgeSensor.stop();
              done();
            }, 2000)
          });
    });
});
