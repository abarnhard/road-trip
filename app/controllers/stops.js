'use strict';

var Stop = require('../models/stop');

exports.create = function(req, res){
  console.log(req.body);
  Stop.create(req.body, function(){
    res.redirect('/trips/' + req.params.tripId);
  });
};

exports.show = function(req, res){
};

exports.addEvent = function(req, res){
};

exports.addPhoto = function(req, res){
};

