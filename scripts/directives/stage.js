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
                            // feher, vilbarna, sarga, narancs, piros, bordo
                            // sotbarna, zold, sotzold, kek, sotkek, fekete
			    window.colorList = [
                                [0xff, 0xff, 0xff], // feher
                                [0xff, 0xee, 0xd5], // vilbarna
                                [0xdd, 0xe3, 0x3a], // sarga
                                [0xdf, 0x61, 0x2f], // narancs
                                [0xc5, 0x49, 0x41], // piros
                                [0xb1, 0x29, 0x3f], // bordo
                                [0x9d, 0x4e, 0x00], // sotetbarna
                                [0x00, 0xb8, 0x00], // zold
                                [0x01, 0x5e, 0x66], // sotzold
                                [0x00, 0x7c, 0xf7], // kek
                                [0x14, 0x64, 0xe2], // sotkek
                                [0x00, 0x00, 0x00]  // fekete
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
