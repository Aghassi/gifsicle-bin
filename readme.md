# node-gifsicle-bin [![Build Status](https://secure.travis-ci.org/yeoman/node-gifsicle-bin.png?branch=master)](http://travis-ci.org/yeoman/node-gifsicle-bin)

gifsicle 1.71 Node.js wrapper that makes it seamlessly available as a local dependency on OS X, Linux and Windows. Most commonly used to manipulate gif images in different ways.

> Gifsicle manipulates GIF image files in many different ways. Depending on command line options, it can merge several GIFs into a GIF animation; explode an animation into its component frames; change individual frames in an animation; turn interlacing on and off; add transparency and much more.


## Example usage

```js
var execFile = require('child_process').execFile;
var gifsiclePath = require('gifsicle-bin').path;

execFile(gifsiclePath, ['-o', 'output.gif', 'input.gif'], function(err, stdout) {
	console.log('Image minified');
});
```

You can also run directly from `./node_modules/.bin/gifsicle-bin`


## Dev

Note to self on how to update the binaries.

### OS X and Linux

Run `npm install` to build the binary.

### Windows

- Download the [Windows files 32/64-bit](http://www.lcdf.org/gifsicle/) on a Windows machine
- Run the downloaded file to extract
- Go to the `bin` folder at the destination and copy `gifsicle.exe`


## License

Everything excluding the binaries licensed under the [BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google.

gifsicle licensed under the GNU General Public License, Version 2.
