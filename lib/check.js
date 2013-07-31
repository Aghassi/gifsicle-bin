'use strict';

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'min'});
var util = require('./util');

var binPath = require('./gifsicle-bin').path;
var binUrl = require('./gifsicle-bin').url;
var srcUrl = require('./gifsicle-bin').src;

fs.exists(binPath, function (exists) {
	if (exists) {
		runTest();
	} else {
		util.fetch(binUrl, binPath, function (err) {
			if (err) return console.log('✗ %s'.red, err.message);
			fs.chmod(binPath, '0755');
			runTest();
		});
	}
});

function runBuild() {
	return util.build(srcUrl, path.dirname(binPath), function (err) {
		if (err) return console.log('✗ %s'.red, err.message);
		console.log('✓ gifsicle rebuilt successfully'.green);
	});
}

function runTest() {
	mocha.addFile('test/test-gifsicle-path.js');
	mocha.run(function (failures) {
		if (failures > 0) {
			console.log('✗ pre-build test failed, compiling from source...'.red);
			runBuild();
		} else {
			console.log('✓ pre-build test passed successfully, skipping build...'.green);
		}
	});
}
