"use strict";

var express = require('express');
var path = require('path');

function main() {
  var app = express();

  app.use('/config', express.static(path.join(__dirname, 'config')));
  app.use('/app', express.static(path.join(__dirname, 'build')));

  app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'view/index.html'));
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
    });
  }

  app.listen(3000, (err) => {
    console.log(`app hosting server listening on 3000, error? ${err}`);
  });
}

main();