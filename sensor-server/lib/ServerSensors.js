"use strict";

const DummySensor = require("dummy-sensor").DummySensor;

/**
 * @param {Object} sensorJson Static data about one sensor.
 * @param {Function} formula Formula to use in order to compute a dummy
            sensor value.
 *
*/
let parseFromJson = function(sensorJson, formula) {
  let sensor = new DummySensor(sensorJson["id"], {
    frequency: 2000
  });
  sensor._name = sensorJson["name"];
  sensor._type = sensorJson["type"];
  sensor._location = sensorJson["location"];
  sensor._formula = formula;

  // We don't generate mock values for the acceleration sensor.
  // The readings come from a real sensor in this case.
  /*
  if (sensor._type == "acceleration") {
    sensor._isAMock = false;
  }
  */

  return sensor;
}

/**
 * @param {JSON} sconfig The json containing the static sensor configuration
 *             data.
 * @return {Map<string, DummySensor>}
*/
module.exports = function createSensors(sconfig) {
  let entries = new Array(sconfig["humidity"], sconfig["temperature"],
    sconfig["light"], sconfig["sound"], sconfig["acceleration"]);

  let humidityFormula = function() {
    return (Math.random() * 25) % 100;
  };
  let temperatureFormula = function() {
    return ((Math.random() * 100) % (25 - 14 + 1) + 14);
  };
  let lightFormula = function() {
    return ((Math.random() * 100) % (500 - 320 + 1) + 320);
  };
  let soundFormula = function() {
    return ((Math.random() * 100) % (85 - 60 + 1) + 60);
  };
  let accFormula = function() {
    return Math.random();
  };

  let formulas = new Array(humidityFormula, temperatureFormula, lightFormula,
     soundFormula, accFormula);


  let sensors = new Map();
  for(let i=0; i<5; i++) {
    sensors.set(entries[i]["id"], parseFromJson(entries[i], formulas[i]));
  }

  return sensors;
};
