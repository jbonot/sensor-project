"use strict";

const uuid = require("uuid");
const httpError = require("http-errors");
const http = require("http");
const DummySensor = require("dummy-sensor").DummySensor;
const DummySensorReading = require("dummy-sensor").DummySensorReading;



// Here only reder static data about the sensors, based on the json file.

// let sensors = new Map();



/* let sensorsResponse = Array
  .from(sensors.keys())
  .map(id => ({id: id})); */

/**
* @param {Map<string, DummySensor>} sensors
* @return {JSON}
*/

function getSensorResponse(sensors) {
  let sensorsResponse = new Object();
  let index = 0;

  for (let [id, sensor] of sensors.entries()) {
    index++;
    let entry = new Object();
    entry["id"] = sensor.id;
    entry["name"] = sensor.name;
    entry["location"] = sensor.location;
    entry["type"] = sensor.type;
    sensorsResponse[index] = entry;
  }
  return sensorsResponse;
}

module.exports = class Sensors
{
    static sensors (request, response, next)
    {
        let sensors = request.app.locals.sensors;
        const sensorsResponse = getSensorResponse(sensors);
        //new Object();
        switch (request.method)
        {
            case "GET":
              response.format(
                {
                    "application/json": () =>
                    {
                        response.status(200).type("application/json").send(sensorsResponse)
                      //  response.status(200).json({ "sensors": sensorsResponse});
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
        let sensors = request.app.locals.sensors;
        let sensor = sensors.get(request.params.sensor);

        switch (request.method)
        {
            case "GET":
                response.format(
                {
                    "application/json": () =>
                    {
                      let sensorResponse = {
                        id: sensor.id,
                        reading: sensor.reading
                      }
                        response.status(200).type("application/json").send(sensorResponse);
                    },
                    "default": () => { next(new httpError.NotAcceptable()); }
                });
                break;
            case "POST":
            case "DELETE":
            case "PUT":
            case "CONNECT":
            case "HEAD":
            case "OPTIONS":
            case "TRACE":
            default:
                response.set("allow", "GET, POST");
                next(new httpError.MethodNotAllowed());
                break;
        }
    }

    static latestReading (request, response, next)
    {
        let sensors = request.app.locals.sensors;
        let sensor = sensors.get(request.params.sensor);

        switch (request.method)
        {
            case "GET":
                response.format(
                {
                    "application/json": () =>
                    { /*
                        let sensorResponse = {
                          id: sensor.id,
                          reading: sensor.reading.dummyValue
                        } */
                        let latest = new Array();
                        latest.push(sensor.reading);
                        response.status(200).type("application/json").send({"latest-value": latest[0]});
                    },
                    "default": () => { next(new httpError.NotAcceptable()); }
                });
                break;
            case "PUT":
                // Received the latest value of a sensor
                response.format(
                {
                    "application/json": () =>
                    {
                        sensor.reading = new DummySensorReading(
                          sensor.name,
                          parseInt(request.params.timestamp),
                          parseFloat(request.params.value)
                        );
                        response.status(200).type("application/json").send({});
                        request.app.locals.sensors.set(request.params.sensor, sensor);
                        console.log("putting sensor!");
                    },
                    "default": () => { next(new httpError.NotAcceptable()); }
                });
            break;
            case "DELETE":
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
