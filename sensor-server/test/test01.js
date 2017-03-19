"use strict";
const createSensors = require("../lib/ServerSensors");
const path = require("path");
const sconfig = require(path.join(__dirname, "config", "sensors.json"));

describe("express4-skeleton", function ()
{
    const assert = require("assert");
    it("should create sensors", function ()
    {
        let sensors = createSensors(sconfig);
        assert(true);
    });
});
