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
				    [0x02, 0x52, 0x5d],
				    [0x00, 0x26, 0x4d],
				    [0x30, 0x30, 0x32],
				    [0x05, 0x03, 0x03],
				    [0x29, 0x17, 0x12],
				    [0x54, 0x19, 0x10],

				    [0x18, 0x1f, 0x0f],
				    [0x01, 0x4e, 0x33],
				    [0x01, 0x53, 0x87],
				    [0x04, 0x2a, 0x7d],
				    [0x00, 0x31, 0x6d],
				    [0x06, 0x19, 0x13],

				    [0x2b, 0x69, 0x07],
				    [0xa1, 0x7a, 0x05],
				    [0x9c, 0x21, 0x02],
				    [0x7f, 0x05, 0x10],
				    [0x76, 0x02, 0x14],
				    [0x57, 0x0a, 0x30],

				    [0x1a, 0x0f, 0x47],
				    [0x8b, 0x38, 0x62],
				    [0xa8, 0x83, 0x7b],
				    [0x9f, 0xa3, 0xac],
				    [0x62, 0x32, 0x0d],
				    [0xaf, 0x76, 0x02],
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
