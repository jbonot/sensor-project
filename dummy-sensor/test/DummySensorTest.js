'use strict';
const assert = require('assert');
const DummySensor = require('../lib/DummySensor');
const DummySensorReading = require('../lib/DummySensorReading');

describe('DummySensor', () =>
{
    it('should create a dummy sensor', () =>
    {
        let dummySensor = new DummySensor();
        assert.equal(dummySensor instanceof DummySensor, true);
    });
    it('should start and stop', done =>
    {
        let dummySensor = new DummySensor();
        dummySensor
          .start()
          .then(() => {
            dummySensor.stop();
            done();
          });
    });
    it('should read a value', done =>
    {
        let dummySensor = new DummySensor();
        dummySensor
          .start()
          .then(() => {
            setTimeout(() => {
              dummySensor.stop();
              done();
            }, 2000)
          });
    });
});
