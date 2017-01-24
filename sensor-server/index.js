"use strict";

const cluster = require("cluster");
const cpus = require("os").cpus().length;
const path = require("path");
const config = require(path.join(__dirname, "config", "start.json"));
const pkg = require(path.join(__dirname, "package.json"));
const debug = require("util").debuglog(pkg.name);

process.title = pkg.name;
config.basedir = __dirname;
if(config.http.secure)
{
    let https = require("https");
    https.globalAgent.maxSockets = 16384;
    https.globalAgent.options.agent = false;
}
else
{
    let http = require("http");
    http.globalAgent.maxSockets = 16384;
    http.globalAgent.options.agent = false;
}

if (cluster.isMaster)
{
    for (let i = 0; i < cpus; ++i)
    {
        cluster.fork();
    }
}
else
{
    launcher(cluster.worker, pkg, config);
}

cluster.on("fork", function(worker)
{
});

cluster.on("disconnect", function()
{
});

cluster.on("error", function(error)
{
    debug(error);
});

cluster.on("exit", function(worker, code, signal)
{
    debug("Worker with id: " + worker.id + " died.");
    debug("Code: " + code);
    debug("Signal: " + signal);
    // restart may be possible
    // cluster.fork();
});

process.on("uncaughtException", function (error)
{
    debug(error.message);
    debug(error.stack);
    process.exit(1);
});

function launcher(worker, pkg, config)
{
    const app = new (require("./lib/DefaultApp"))(worker, pkg, config);
    worker.process.title = `${pkg.name}:${worker.id}`;
    app.start();
};
