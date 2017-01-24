"use strict";

module.exports = function (request, response)
{
    response.render("index", {
        "menu_name": "index",
        "header": "Welcome to the example express.js application"
    });
};