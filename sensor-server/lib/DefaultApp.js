"use strict";

module.exports = class DefaultApp
{
    constructor(worker, pkg, config)
    {
        const compress = require("compression");
        const ejs = require("ejs");
        const express = require("express");
        const favicon = require("serve-favicon");
        const mkdirp = require("mkdirp");
        const morgan = require("morgan");
        const session = require("express-session");
        const uuid = require("uuid");
        const debug = require("util").debuglog(pkg.name);
        const fs = require("fs");
        const os = require("os");
        const path = require("path");
        const APIRouter = require("./APIRouter");
        const DefaultRouter = require("./DefaultRouter");

        /* ===== Define app ===== */
        const app = new require("express")();

        /* ===== Define locals ===== */
        app.locals = {
            basedir: config.basedir,
            pkg: pkg,
            public: path.join(config.basedir, "client", "public"),
            users: path.join(os.tmpdir(), pkg.name, "users"),
            favicon: path.join(config.basedir, "client", "public", "images", "favicon.ico"),
            worker: worker,
            logger: debug
        };

        /* ===== Define app settings ===== */
        app.set("view engine", "html");
        app.set("etag", "strong");
        app.set("trust proxy", true);
        app.set("views", path.join(config.basedir, "client", "views"));
        app.set("x-powered-by", false);

        /* ===== Define log stream ===== */
        const logdir = path.join(os.homedir(), ".logs");
        try
        {
            fs.accessSync(logdir);
        }
        catch (error)
        {
            debug(error.message);
            debug(`Creating new directory: ${logdir}`);
            mkdirp.sync(logdir)
        }
        const access = fs.createWriteStream(
            path.join(logdir, "access_" + worker.id + ".log"),
            { flags: "a" }
        );
        app.use(morgan("combined", { "stream": access }));

        /* ===== Compression ===== */
        app.use(compress({  "threshold": 32, "chunkSize": 16 * 1024 }));

        /* ===== Static ===== */
        app.use(express.static(app.locals.public));
        app.use(favicon(app.locals.favicon));

        /* ===== Sessions ===== */
        app.use(session({
            "genid": (req) => { return uuid.v1(); },
            "name": "sid",
            "resave": false,
            "saveUninitialized": true,
            "secret": "7dbcbbea-f0f2-11e4-b9b2-1697f925ec7b",
            "cookie": {
                "path": "/",
                "httpOnly": true,
                "secure": config.http.secure,
                "maxAge": 60000
            }
        }));

        /* ===== Rendering ===== */
        app.engine(".html", ejs.__express);

        /* ===== Routes ===== */
        const router1 = new DefaultRouter();
        const router2 = new APIRouter();
        app.use("/api", router2);
        app.use("/", router1);

        /* ===== Error handling ===== */
        const Error = require("./mw/Error");
        app.use(Error.logger);
        app.use(Error.renderer);

        /* ===== Class properties ===== */
        this.app = app;
        this.config = config;
    }

    start()
    {
        const fs = require("fs");
        const path = require("path");
        const ipaddress = this.config["http"]["ipaddress"];
        const port = this.config["http"]["port"];

        let server = null;
        if(this.config["http"]["secure"])
        {
            let kf = path.join(this.config.basedir, "config", "certs",
                this.config["http"]["key"]);
            let cf = path.join(this.config.basedir, "config", "certs",
                this.config["http"]["cert"]);
            if(!fs.existsSync(kf) || !fs.existsSync(cf))
            {
                throw new Error("HTTP certificate file not found.");
            }
            let options =
            {
                "key": fs.readFileSync(kf),
                "cert": fs.readFileSync(cf)
            };
            server = require("https").createServer(options, this.app);
        }
        else
        {
            server = require("http").createServer(this.app);
        }
        server.timeout = 10000;
        server.listen(port, ipaddress, () => {
            console.info(`${this.app.locals.pkg["name"]} [worker ${this.app.locals.worker.id}] started at ${new Date()}. IP address: ${ipaddress}, port: ${port}`);
        });
    }
};