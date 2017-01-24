"use strict";

module.exports = class DefaultRouter extends require("express").Router
{
    constructor(opts)
    {
        super(opts || DefaultRouter.defaultOptions());
        this.use("/", DefaultRouter.xPoweredBy, DefaultRouter.logSession, DefaultRouter.allowOnlyGetMethod);
        this.get("/", require("./routes/index"));
        this.get("/index", require("./routes/index"));
        this.get("/index.html", require("./routes/index"));
        this.get("/system.html", require("./routes/system"));
        this.get("/license.html", require("./routes/license"));
        this.get("/error.html", require("./routes/error"));

        /* ===== 404 Error handling ===== */
        this.use(require("./mw/_404"));
    }

    static allowOnlyGetMethod (request, response, next)
    {
        const ErrorMessages = `Method ${request.method} Not Allowed for URL ${request.originalUrl}`;
        switch (request.method)
        {
            case "CONNECT":
            case "DELETE":
            case "HEAD":
            case "OPTIONS":
            case "PUT":
            case "TRACE":
            case "POST":
                const error = new Error(ErrorMessages);
                response.set("Allow", "GET");
                response.statusCode = 405;
                next(error);
                break;
            case "GET":
            default:
                next();
                break;
        }
    }

    static logSession (request, response, next)
    {
        request.app.locals.logger(request.session);
        next();
    }

    static xPoweredBy (request, response, next)
    {
        response.set("X-Powered-By",
            `${request.app.locals.pkg.name}/${request.app.locals.pkg.version} (${request.app.locals.pkg.description})`);
        next();
    }

    static defaultOptions()
    {
        return { "caseSensitive": true, "strict": true };
    }
};