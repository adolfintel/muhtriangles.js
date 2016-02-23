# MuhTriangles.js

MuhTriangles.js is a simple and lightweight library for drawing colorful and animated triangles to an HTML5 Canvas element, with a good amout of settings that you can tweak.

## See it in action
MuhTriangles.js is the default background on [my website](http://adolfintel.com). You can see it change color with the time of day.

## Compatibility

As far as I know, it works on browsers as old as IE9.
Any browser that supports the Canvas element should be supported.
Remember to include a fallback if you're planning to support older browsers too.

## Basic usage

1. Include muhTriangles.min.js into your page.
1. call new MuhTriangles('your canvas id here')

To tweak the settings, you can use `editor.html`, and copy the string at the bottom, then in your page you can call `new MuhTriangles('<your canvas id here>','<string from editor>')`

## Files

- __muhTriangles.js__		Source code
- __muhTriangle.min.js__	Compressed version to include in your pages. USE THIS ONE!
- __editor.html__			Visual settings editor
- __embed.html__			Embeddable version (see details below)
- __example[1-4].html__		Various usage examples

### Embeddable version

The embeddable version can be used from an iframe with embed.html as source.
Settings can be passed as URL parameters like this:
embed.html?<string from editor>
To use this version in your page, you will need to copy both muhTriangles.min.js and embed.html into your project.

### NPM

`npm install "http://downloads.adolfintel.com/geth.php?r=muhTriangles"`

## Screenshots
[![Screenshot](http://adolfintel.com/muhTriangles.js/settingsp.png)](http://adolfintel.com/muhTriangles/settings.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/1p.png)](http://adolfintel.com/muhTriangles/1.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/2p.png)](http://adolfintel.com/muhTriangles/2.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/3p.png)](http://adolfintel.com/muhTriangles/3.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/4p.png)](http://adolfintel.com/muhTriangles/4.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/5p.png)](http://adolfintel.com/muhTriangles/5.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/6p.png)](http://adolfintel.com/muhTriangles/6.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/7p.png)](http://adolfintel.com/muhTriangles/7.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/8p.png)](http://adolfintel.com/muhTriangles/8.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/9p.png)](http://adolfintel.com/muhTriangles/9.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/10p.png)](http://adolfintel.com/muhTriangles/10.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/11p.png)](http://adolfintel.com/muhTriangles/11.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/12p.png)](http://adolfintel.com/muhTriangles/12.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/13p.png)](http://adolfintel.com/muhTriangles/13.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/14p.png)](http://adolfintel.com/muhTriangles/14.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/15p.png)](http://adolfintel.com/muhTriangles/15.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/16p.png)](http://adolfintel.com/muhTriangles/16.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/17p.png)](http://adolfintel.com/muhTriangles/17.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a1p.png)](http://adolfintel.com/muhTriangles/a1.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a2p.png)](http://adolfintel.com/muhTriangles/a2.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a3p.png)](http://adolfintel.com/muhTriangles/a3.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a4p.png)](http://adolfintel.com/muhTriangles/a4.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a5p.png)](http://adolfintel.com/muhTriangles/a5.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a6p.png)](http://adolfintel.com/muhTriangles/a6.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a7p.png)](http://adolfintel.com/muhTriangles/a7.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a8p.png)](http://adolfintel.com/muhTriangles/a8.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a9p.png)](http://adolfintel.com/muhTriangles/a9.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a10p.png)](http://adolfintel.com/muhTriangles/a10.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/a11p.png)](http://adolfintel.com/muhTriangles/a11.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/tallp.png)](http://adolfintel.com/muhTriangles/tall.png)
[![Screenshot](http://adolfintel.com/muhTriangles.js/widep.png)](http://adolfintel.com/muhTriangles/wide.png)

## License
Copyright (C) 2016 Federico Dossena

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/lgpl>.
