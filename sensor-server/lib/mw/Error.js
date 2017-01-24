"use strict";

module.exports = class Error
{
    static logger (error, request, response, next)
    {
        request.app.locals.logger(error.message);
        next(error);
    }

    static renderer (error, request, response, next)
    {
        const http = require("http");
        response.charset = "utf-8";
        if (!response.statusCode || response.statusCode < 400)
        {
            if(error.status)
            {
                response.status(error.status);
            }
            else
            {
                response.status(500);
            }
        }
        response.format({
            "text/plain": () =>
            {
                response.type("text/plain");
                response.send(error.message);
            },
            "text/html": () =>
            {
                response.render("_500", {
                    menu_name: "error",
                    header: `HTTP error status code: ${response.statusCode}`,
                    request: request,
                    status: `${response.statusCode} (${http.STATUS_CODES[response.statusCode]})`,
                    error: error
                });
            },
            "application/xhtml+xml": () =>
            {
                response.render("_500", {
                    menu_name: "error",
                    header: `HTTP error status code: ${response.statusCode}`,
                    request: request,
                    status: `${response.statusCode} (${http.STATUS_CODES[response.statusCode]})`,
                    error: error
                });
            },
            "application/json": () =>
            {
                response.json({"error": error.message});
            },
            "default": () =>
            {
                response.type("text/plain");
                response.send(error.message);
            }
        });
    }
};