(function(process) {
  'use strict';
  eval(require('fs').readFileSync('tests/truck.js', 'utf8'));
  eval(require('fs').readFileSync('tests/datastore.js', 'utf8'));
  var App = process.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var myTruck = new Truck('ncc-1701', new DataStore());
  process.myTruck = myTruck;
  eval(require('fs').readFileSync('tests/truck.js', 'utf8'));
  eval(require('fs').readFileSync('tests/datastore.js', 'utf8'));
})(process);
