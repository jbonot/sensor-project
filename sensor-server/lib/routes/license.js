"use strict";

module.exports = function (request, response)
{
    response.render("license", {
        "menu_name": "license",
        "header": "WebCC Public License"
    });
};