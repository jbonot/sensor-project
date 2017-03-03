"use strict";

const DummySensor = require("dummy-sensor").DummySensor;

module.exports = function createSensors() {
  console.log("Creating sensors!");
  let names = new Array("Humidity Sensor", "Temperature Sensor", "Ambient Light Sensor",
      "Sound Intensity Sensor");
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
    let sensor = new DummySensor(i+10, {
      frequency: 2000
    });
    sensor.onchange = event => sensor.reading = event.reading;
    sensor.name = names[i];
    sensor.formula = formulas[i];

    sensors.set(sensor.id, sensor);
  }

  Array
      .from(sensors.entries())
      .forEach(entry => entry[1].start());

  console.log(sensors);
  return sensors;
};
