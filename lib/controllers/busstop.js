//File: routes/busstop.js
module.exports = function(app) {

  var mongoose = require('mongoose'),
    BusStop = mongoose.model('BusStop');

  //GET - Return all busstops in the DB
  var findAllBusStops = function(req, res, next) {
    var searchOptions = {};
    if (req.query.linea!==null && req.query.linea!==undefined) {
      searchOptions.lines = {"$in":[req.query.linea]};
    }
    BusStop.find(searchOptions, function(err, busstops) {
      if(!err) {
        console.log('GET /busstops');
        res.send(busstops);
      } else {
        console.log('ERROR: ' + err);
        next(err);
      }
    });
  };

  //GET - Return a BusStop with specified ID
  var findById = function(req, res, next) {
    BusStop.findById(req.params.id, function(err, busstop) {
      if(!err) {
        console.log('GET /busstop/' + req.params.id);
        if (busstop!==null) {
          //console.log('FullTitle::::', busstop.fullTitle);
          res.send(busstop);
        } else {
          res.send(404);
        }
      } else {
        console.log('ERROR: ' + err);
        next(err);
      }
    });
  };

  //POST - Insert a new BusStop in the DB
  var addBusStop = function(req, res, next) {
    console.log('POST');
    console.log(req.body);

    var busstop = new BusStop(req.body);

    busstop.save(function(err, data) {
      if(!err) {
        console.log('Created');
        res.send(busstop);
      } else {
        console.log('ERROR: ' + err);
        next(err);
        //next(new Error('Error adding bus stop'));
        //res.send(499, 'Error adding bus stop');
      }
    });
  };

  //PUT - Update a register already exists
  var updateBusStop = function(req, res, next) {
    BusStop.findById(req.params.id, function(err, busstop) {
      busstop.title       = req.body.title;
      busstop.subtitle    = req.body.subtitile;
      busstop.name        = req.body.name;
      busstop.lon         = req.body.lon;
      busstop.lat         = req.body.lat;
      busstop.pole        = req.body.pole;
      busstop.lines       = req.body.lines;

      busstop.save(function(err, data) {
        if(!err) {
          console.log('Updated');
          res.send(data);
        } else {
          console.log('ERROR: ' + err);
          next(err);
        }
      });
    });
  };

  //DELETE - Delete a BusStop with specified ID
  var deleteBusStop = function(req, res, next) {
    BusStop.findById(req.params.id, function(err, busstop) {
      busstop.remove(function(err) {
        if(!err) {
          console.log('Removed');
          res.send(200);
        } else {
          console.log('ERROR: ' + err);
          next(err);
        }
      });
    });
  };

  //Link routes and functions
  app.get('/api/busstop', findAllBusStops);
  app.get('/api/busstop/:id', findById);
  app.post('/api/busstop', addBusStop);
  app.put('/api/busstop/:id', updateBusStop);
  app.delete('/api/busstop/:id', deleteBusStop);

};
