"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function (request, response)
{
    response.render("index", {
        "menu_name": "index",
        "header": "Sensor Dashboard"
    });
};
