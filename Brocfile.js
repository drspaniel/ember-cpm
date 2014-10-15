/* global require, module */

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

var emberCPM;

if (process.argv[2] === 'build') {
  var dist    = require('broccoli-dist-es6-module');
  var Funnel  = require('broccoli-funnel');

  var transpiled = dist('addon', {
    global: 'EmberCPM',
    packageName: 'ember-cpm',
    main: 'ember-cpm',
    shim: { 'ember': 'Ember' }
  });

  emberCPM = new Funnel(transpiled, {
    getDestinationPath: function(relativePath) {
      if (relativePath === 'globals/main.js') {
        return 'globals/ember-cpm.js';
      } else if (relativePath === 'named-amd/main.js') {
        return 'named-amd/ember-cpm.js';
      }
      return relativePath;
    }
  });
} else {
  var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
  var app = new EmberAddon();
  emberCPM = app.toTree();
}

if (process.env.EMBER_ENV === 'production') {
  var defeatureify = require('broccoli-defeatureify');

  emberCPM = defeatureify(emberCPM, {
    enableStripDebug: true,
    debugStatements: [
      "Ember.warn",
      "emberWarn",
      "Ember.assert",
      "emberAssert",
      "Ember.deprecate",
      "emberDeprecate",
      "Ember.debug",
      "emberDebug",
      "Ember.Logger.info",
      "Ember.runInDebug",
      "runInDebug"
    ]
  });
}

module.exports = emberCPM;
