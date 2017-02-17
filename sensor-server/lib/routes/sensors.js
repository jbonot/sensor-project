"use strict";

const uuid = require("uuid");
const httpError = require("http-errors");
const http = require("http");
const DummySensor = require("dummy-sensor").DummySensor;

let sensors = new Map();
let names = new Array("Humidity Sensor", "Temperature Sensor", "Ambient Light Sensor",
    "Sound Intensity Sensor");

for(let i=0; i<4; i++) {
  let sensor = new DummySensor(i+10, {
    frequency: 2000
  });
  sensor.onchange = event => sensor.reading = event.reading;
  sensor.name = names[i];
  sensors.set(sensor.id, sensor);
}


Array
    .from(sensors.entries())
    .forEach(entry => entry[1].start());

/* let sensorsResponse = Array
  .from(sensors.keys())
  .map(id => ({id: id})); */

const sensorsResponse = new Map();

for (var [id, sensor] of sensors.entries()) {
  sensorsResponse.set(id, sensor.name);
}

module.exports = class Sensors
{
    static sensors (request, response, next)
    {
        switch (request.method)
        {
            case "GET":
              response.format(
                {
                    "application/json": () =>
                    {
                        response.status(200).json({ "sensors": Array.from(sensorsResponse.entries())});
                        console.log(sensors.entries());
                    },
                    "default": () => { next(new httpError.NotAcceptable()); }
                });
                break;
            case "POST":
            case "CONNECT":
            case "DELETE":
            case "HEAD":
            case "OPTIONS":
            case "PUT":
            case "TRACE":
            default:
                response.set("allow", "GET");
                next(new httpError.MethodNotAllowed());
                break;
        }
    }

    static sensor (request, response, next)
    {
        let sensor = sensors.get(request.params.sensor);

        let sensorResponse = {
          id: sensor.id,
          reading: sensor.reading
        }
        switch (request.method)
        {
            case "GET":
                response.format(
                {
                    "application/json": () =>
                    {
                        response.status(200).type("application/json").send(sensorResponse);
                    },
                    "default": () => { next(new httpError.NotAcceptable()); }
                });
                break;
            case "DELETE":
            case "PUT":
            case "CONNECT":
            case "HEAD":
            case "OPTIONS":
            case "POST":
            case "TRACE":
            default:
                response.set("allow", "GET, POST");
                next(new httpError.MethodNotAllowed());
                break;
        }
    }

    static _404 (request, response)
    {
        response.status(404).json({ "error": http.STATUS_CODES[404] })
    }
};
