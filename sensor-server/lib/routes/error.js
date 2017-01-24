"use strict";

module.exports = function (request, response, next)
{
    const error = new Error("This is a provoked server error!");
    next(error);
};
