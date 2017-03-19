"use strict";

const parser = require("body-parser");
const Users = require("./routes/users");
const Sensors = require("./routes/sensors");
const DefaultRouter = require("./DefaultRouter");

module.exports = class APIRouter extends require("express").Router
{
    constructor(opts)
    {
        super(opts || APIRouter.defaultOptions());
        this.all("/users/:user", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Users.createStorageDirectory, Users.user);
        this.all("/users", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Users.createStorageDirectory, Users.users);


        this.all("/sensors/:sensor/sensorReadings/latest", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.latestReading);
        this.all("/sensors/:sensor", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.sensor);
        this.all("/sensors", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.sensors);
        this.all("/sensors/register/:id/:name", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.sensor);
        this.all("/sensors/:sensor/reading/:value/:timestamp", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.latestReading);

        /* ===== 404 Error handling ===== */
        this.use(Users._404);
    }

    static defaultOptions()
    {
        return { "caseSensitive": true, "strict": true };
    }
};
