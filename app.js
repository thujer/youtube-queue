/**
 * ------------------------------------------------
 *           Žižkostel - komunitní centrum
 *                Webová prezentace
 * ------------------------------------------------
 * Author: Tomas Hujer (c) 2015
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var http = require('http');

var port = 3002;

var app = express();
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handlers
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    /*
    console.log('Client connected to media_server');

    client.on('event', function(event) {
      console.log(event);
      if(event.state !== undefined) {
          switch(event.state) {
              case 'incoming_media':
                  console.log('incoming_media: ' + event.media_id);
                  client.broadcast.emit('event', { state: 'incoming_media', media_id: event.media_id });
                  break;
          }
      }
    });
    */

    //client.emit('event', { state: 'incoming_media', media_id: 'cxGYHnTRMAw' });
    //client.emit('event', { state: 'incoming_media', media_id: 'mQOmDUnt8Hs' });

});

/**
 * Handle post request
 */
routes.post('/client', function(req, res) {
    io.emit('event', { state: 'incoming_media', media_id: req.body.media_id });
    res.render('client', { title: 'Žižkostel'});
});

module.exports = app;
module.exports.server = server;
module.exports.port = port;
