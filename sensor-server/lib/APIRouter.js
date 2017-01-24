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


        this.all("/sensors/:sensor", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.sensor);
        this.all("/sensors", DefaultRouter.xPoweredBy,
            parser.json({ "inflate": true, "strict": true }), Sensors.sensors);

        /* ===== 404 Error handling ===== */
        this.use(Users._404);
    }

    static defaultOptions()
    {
        return { "caseSensitive": true, "strict": true };
    }
};
