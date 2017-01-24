"use strict";

module.exports = function (request, response)
{
    response.render("system", {
        "menu_name": "system",
        "header": "System information"
    });
};