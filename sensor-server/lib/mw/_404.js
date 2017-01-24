"use strict";

module.exports = function (request, response)
{
    response.charset = "utf-8";
    response.status(404);
    if (request.accepts("html"))
    {
        response.render("_404", {
            "menu_name": "",
            "header": "HTTP error 404 :: Page Not Found",
            "request": request
        });
    }
    else
    {
        response.send({"message": "HTTP error 404 :: Page Not Found"});
    }
};