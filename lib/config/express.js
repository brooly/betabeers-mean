'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');

    app.use(function(req, res, next) {
      console.log('Estamos en el middleware de prueba:', req.url);
      next();
    });
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());         //Para parsear application/json request bodies
    app.use(express.urlencoded());  //Para parsear x-ww-form-urlencoded request bodies
    //app.use(express.multipart());         //Para parsear multipart/form-data request bodies
    //app.use(express.methodOverride());    //Para indicar el method (POST, PUT) directamente en el formulario y sobreescribir el metodo por defecto del form

    // Router (only error handlers should come after this)
    app.use(app.router);
  });

  // Error handler
  app.configure('development', function(){
    app.use(express.errorHandler());
  });
};