'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash');

function Trip(o){
  this._id            = Mongo.ObjectID();
  this.name           = o.name[0];
  this.cash           = o.cash[0] * 1;
  this.originLoc      = {name:o.origin[0], lat:parseFloat(o.origLat[0]), lng:parseFloat(o.origLng[0])};
  this.destinationLoc = {name:o.destination[0], lat:parseFloat(o.destLat[0]), lng:parseFloat(o.destLng[0])};
  this.distance       = o.distance * 1;
  this.from           = new Date(o.from[0]);
  this.to             = new Date(o.to[0]);
  this.mpg            = o.mpg[0] * 1;
  this.costPerGal     = o.costPerGal[0] * 1;
  this.stops          = 0;
  this.photos         = 0;
  this.events         = 0;
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('trips');}
});

Object.defineProperty(Trip.prototype, 'gallons', {
  get: function(){return this.distance / this.mpg;}
});

Object.defineProperty(Trip.prototype, 'cost', {
  get: function(){return this.gallons * this.costPerGal;}
});

Object.defineProperty(Trip.prototype, 'delta', {
  get: function(){return this.cash - this.cost;}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(function(err, objs){
    var trips = objs.map(function(o){return _.create(Trip.prototype, o);});
    cb(err, trips);
  });
};

Trip.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Trip.collection.findOne({_id:id}, function(err, obj){
    var t = _.create(Trip.prototype, obj);
    cb(err, t);
  });
};

Trip.prototype.save = function(cb){
  Trip.collection.save(this, cb);
};

module.exports = Trip;

