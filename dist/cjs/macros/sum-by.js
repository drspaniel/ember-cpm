"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;
var reduceComputed = Ember.reduceComputed;

/**
 * DEPRECATED - 10/14/2014
 * Rather than use sumBy, developers should use composed computed property macros
 *
 * OLD WAY
 * {
 *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
 *   listValSum: sumBy('list', 'val')
 * }
 *
 * NEW WAY
 * {
 *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
 *   listValSum: sum(mapBy('list', 'val'))
 * }
 */

exports["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
  
  return reduceComputed(dependentKey + '.@each.' + propertyKey, {
    initialValue: 0.0,

    addedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
      return accumulatedValue + parseFloat(get(item, propertyKey));
    },

    removedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
      return accumulatedValue - parseFloat(get(item, propertyKey));
    }
  });
}