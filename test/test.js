/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('gifsicle()', function () {
	afterEach(function (cb) {
		rm(path.join(__dirname, 'tmp'), cb);
	});

	beforeEach(function (cb) {
		fs.mkdir(path.join(__dirname, 'tmp'), cb);
	});

	it('should rebuild the gifsicle binaries', function (cb) {
		var tmp = path.join(__dirname, 'tmp');
		var builder = new BinBuild()
			.src('http://www.lcdf.org/gifsicle/gifsicle-1.83.tar.gz')
			.cmd('./configure --disable-gifview --disable-gifdiff --prefix="' + tmp + '" --bindir="' + tmp + '"')
			.cmd('make install');

		builder.build(function (err) {
			assert(!err);
			assert(fs.existsSync(path.join(tmp, 'gifsicle')));
			cb();
		});
	});

	it('should return path to binary and verify that it is working', function (cb) {
		var binPath = require('../').path;

		binCheck(binPath, ['--version'], function (err, works) {
			assert(!err);
			assert.equal(works, true);
			cb();
		});
	});

	it('should minify a GIF', function (cb) {
		var binPath = require('../').path;
		var args = [
			'-o', path.join(__dirname, 'tmp/test.gif'),
			path.join(__dirname, 'fixtures/test.gif')
		];

		execFile(binPath, args, function (err) {
			var src = fs.statSync(path.join(__dirname, 'fixtures/test.gif')).size;
			var dest = fs.statSync(path.join(__dirname, 'tmp/test.gif')).size;

			assert(!err);
			assert(dest < src);
			cb();
		});
	});
});
