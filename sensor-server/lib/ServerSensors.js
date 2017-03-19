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


  return sensor;
}

/**
 * @param {JSON} sconfig The json containing the static sensor configuration
 *             data.
 * @return {Map<string, DummySensor>}
*/
module.exports = function createSensors(sconfig) {
  let entries = new Array(sconfig["humidity"], sconfig["temperature"],
    sconfig["light"], sconfig["sound"]);

  let humidityFormula = function() {
    return (Math.random() * 25) % 100;
  };
  let temperatureFormula = function() {
    return (Math.random() * 25) % 100;
  };
  let lightFormula = function() {
    return (Math.random() * 25) % 100;
  };
  let soundFormula = function() {
    return (Math.random() * 25) % 100;
  };
  let formulas = new Array(humidityFormula, temperatureFormula, lightFormula, soundFormula);


  let sensors = new Map();
  for(let i=0; i<4; i++) {
    // sensor.name = entries[i];

  // sensor.onchange = event => sensor.reading = event.reading;
    sensors.set(entries[i]["id"], parseFromJson(entries[i], formulas[i]));
  }

  return sensors;
};
