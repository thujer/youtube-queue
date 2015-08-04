#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug');

var server = app.server;

/*
 var http = require('http'),
 httpProxy = require('http-proxy'),
 proxyServer = httpProxy.createServer ({
 hostnameOnly: true,
     router: {
     'domain.com':       '127.0.0.1:81',
     'domain.co.uk':     '127.0.0.1:82',
     '127.0.0.1':        '127.0.0.1:83'
     }
 });

 proxyServer.listen(80);
 */

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = (typeof port === 'string') ? ('Pipe ' + port) : ('Port ' + port);

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === 'string') ? ('pipe ' + addr) : ('port ' + addr.port);
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}
