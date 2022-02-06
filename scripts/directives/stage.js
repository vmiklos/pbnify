/**
 * @license
 * Copyright Dan Munro
 * Released under Expat license <https://directory.fsf.org/wiki/License:Expat>
 */

'use strict';

/**
 * @ngdoc directive
 * @name pbnApp.directive:stage
 * @description
 * # stage
 */
angular.module('pbnApp')
    .directive('stage', function () {
	return {
	    restrict: 'A',
	    link: function(scope, elem, attr) {
		var canvas = elem[0];
		canvas.addEventListener('click', function(event) {
		    if (scope.step == 'select') {
			var rect = canvas.getBoundingClientRect();
			var x = event.clientX - rect.left;
			var y = event.clientY - rect.top;
			
			var pixels = { r: [], g: [], b: [] };
			for (var xNear = x - 3; xNear <= x + 3; xNear ++) {
			    for (var yNear = y - 3; yNear <= y + 3; yNear ++) {
				var pixel = scope.ctx.getImageData(xNear, yNear, 1, 1).data;
				pixels.r.push(pixel[0]);
				pixels.g.push(pixel[1]);
				pixels.b.push(pixel[2]);
			    }
			}
			// var pixel = scope.ctx.getImageData(x, y, 1, 1).data;
			// var color = {
			// 	r: pixel[0],
			// 	g: pixel[1],
			// 	b: pixel[2]
			// };
			var mean = function(array) {
			    return array.reduce(function(a, b) {return a + b;}, 0) / array.length;
			};
			var color = {
			    r: Math.round(mean(pixels.r)),
			    g: Math.round(mean(pixels.g)),
			    b: Math.round(mean(pixels.b))
			};
			if (window.colorList === undefined)
			{
			    window.colorList = [
				    [0x02, 0x01, 0x01],
				    [0xe7, 0x92, 0x38],
				    [0x2a, 0x3c, 0x40],
				    [0x98, 0x83, 0x03],
				    [0x20, 0x1c, 0x41],
				    [0xe2, 0x55, 0x03],

				    [0x8f, 0x24, 0x34],
				    [0xf4, 0xbd, 0x00],
				    [0x7e, 0x46, 0x15],
				    [0x14, 0x21, 0x67],
				    [0x24, 0x20, 0x17],
				    [0xf3, 0xb2, 0x00],

				    [0xb0, 0x33, 0x21],
				    [0xe3, 0x4f, 0x1f],
				    [0x7c, 0x34, 0x7e],
				    [0xe5, 0xe4, 0xe9],
				    [0x74, 0x76, 0x82],
				    [0x0c, 0x31, 0x81],

				    [0xc5, 0x57, 0x74],
				    [0x1f, 0x8c, 0xf1],
				    [0x3a, 0x80, 0x42],
				    [0x1a, 0x47, 0x2a],
				    [0x61, 0x7f, 0x29],
				    [0x00, 0x53, 0xa1],
                            ];
			    window.colorIndex = 0;
			}
			var pixel = window.colorList[window.colorIndex];
			window.colorIndex++;
			var color = {
			    r: pixel[0],
			    g: pixel[1],
			    b: pixel[2]
                        };
			scope.addColor(color);
			scope.$apply();
		    }
		});
	    }
	};
    });
