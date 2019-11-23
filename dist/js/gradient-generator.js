'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GradientGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvasGradient = require('./canvas-gradient.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GradientGenerator = exports.GradientGenerator = function () {
	function GradientGenerator() {
		_classCallCheck(this, GradientGenerator);

		this.DELAY = 10;
		this.firstGrad = true;
		this.isFirstLoad = true;
		this.supportsCssVars = false;
		this.prevColors = {
			targetColorOne: [10, 10, 10],
			targetColorTwo: [0, 0, 0]
		};
		this.midRGB = [5, 5, 5];
		this.transitionHandler = null;
		this.increment = null;
	}

	_createClass(GradientGenerator, [{
		key: 'startTransition',
		value: function startTransition(isFirstLoad) {
			var _this = this;

			this.isFirstLoad = isFirstLoad;
			var randomColors = GradientGenerator.createRandomGradient();
			var targetColorOne = randomColors.rgbOne;
			var targetColorTwo = randomColors.rgbTwo;
			if (this.isFirstLoad) this.prevColors = { targetColorOne: targetColorOne, targetColorTwo: targetColorTwo };

			this.transitionHandler = setInterval(function () {
				_this.transitionGradient(_this.isFirstLoad, targetColorOne, targetColorTwo);
			}, this.DELAY);
		}
	}, {
		key: 'checkAndUpdateColor',
		value: function checkAndUpdateColor(currentColor, targetColor) {
			var _this2 = this;

			this.increment = this.isFirstLoad ? [0, 0, 0] : [1, 1, 1];
			currentColor.forEach(function (color, index) {
				if (currentColor[index] > targetColor[index]) {
					currentColor[index] -= _this2.increment[index];
					if (currentColor[index] <= targetColor[index]) _this2.increment[index] = 0;
				} else {
					currentColor[index] += _this2.increment[index];
					if (currentColor[index] >= targetColor[index]) _this2.increment[index] = 0;
				}
			});
		}
	}, {
		key: 'transitionGradient',
		value: function transitionGradient(onLoad, targetColorOne, targetColorTwo) {

			var currentColor = this.firstGrad ? this.prevColors.targetColorOne : this.prevColors.targetColorTwo;
			var targetColor = this.firstGrad ? targetColorOne : targetColorTwo;

			this.checkAndUpdateColor(currentColor, targetColor);

			var stopOne = 'rgb(' + this.prevColors.targetColorOne[0] + ' , ' + this.prevColors.targetColorOne[1] + ' , ' + this.prevColors.targetColorOne[2] + ')';
			var stopTwo = 'rgb(' + this.prevColors.targetColorTwo[0] + ' , ' + this.prevColors.targetColorTwo[1] + ' , ' + this.prevColors.targetColorTwo[2] + ')';

			this.applyChange(stopOne, stopTwo);

			var incrementTotalValueIsZero = GradientGenerator.checkReducedValueOfArray(this.increment);

			if (incrementTotalValueIsZero) {
				this.checkAndUpdateColor(currentColor, targetColor);
				this.reloadStyleTags(stopOne, stopTwo);
				document.querySelector('.mood-actions').classList.add('active');
				clearInterval(this.transitionHandler);
				this.applyCanvasGradient(stopOne, stopTwo, true);
			}
		}
	}, {
		key: 'reloadStyleTags',


		//apply styles to head
		value: function reloadStyleTags(stopOne, stopTwo) {
			var styleElem = document.getElementById('tags');
			if (styleElem) styleElem.parentNode.removeChild(styleElem);
			var styleContent = '.glitch:before{ text-shadow:2px 0 ' + stopTwo + ' }\n.glitch:after{ text-shadow:2px 0 ' + stopOne + ' }';
			var styleSheet = document.createElement('style');
			styleSheet.id = 'tags';
			styleSheet.innerHTML = styleContent;
			document.head.appendChild(styleSheet);
		}
	}, {
		key: 'applyCanvasGradient',
		value: function applyCanvasGradient(stopOne, stopTwo, isLast) {
			// check if it is node env. Run only if it's not until I figure out testing paper.js
			if (typeof process === 'undefined') {
				global.process = 'test';
				return (0, _canvasGradient.applyGradientToCanvas)(stopOne, stopTwo, isLast);
			} else {
				return 'Developer needs more time to learn testing paper.js';
			}
		}
	}, {
		key: 'applyChange',
		value: function applyChange(stopOne, stopTwo) {
			var outerElem = document.querySelector('.outer');
			outerElem.classList.add('active');
			this.applyCanvasGradient(stopOne, stopTwo, false);
			if (this.supportsCssVars) {
				document.documentElement.style.setProperty('--gradient-one', '' + stopOne);
				document.documentElement.style.setProperty('--gradient-two', '' + stopTwo);
			} else {
				outerElem.style.backgroundImage = 'linear-gradient(45deg,' + stopOne + ',' + stopTwo + ')';
			}
			this.firstGrad = !this.firstGrad;
		}
	}], [{
		key: 'getRandomRGBValue',
		value: function getRandomRGBValue() {
			return Math.floor(Math.random() * 255);
		}
	}, {
		key: 'defineColorBrightness',
		value: function defineColorBrightness() {
			// based on color contrast formula: https://www.w3.org/TR/AERT/#color-contrast
			var rgb = GradientGenerator.midRGB;
			var sum = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
			// const safeColor = sum >= 128 ? '#2b2b2b' : '#d0d0d0';
			var safeColor = null;
			var className = null;
			if (sum >= 100) {
				safeColor = '#333333';
			} else if (sum < 100 && sum > 45) {
				safeColor = '#252525';
			} else {
				safeColor = '#a5a5a5';
			}
			document.documentElement.style.setProperty('--safe-color', '' + safeColor);
			switch (safeColor) {
				case '#333333':
					className = 'theme-medium';
					break;
				case '#252525':
					className = 'theme-dark';
					break;
				default:
					className = 'theme-bright';
			}
			document.documentElement.classList.remove('theme-dark', 'theme-bright', 'theme-medium');
			document.documentElement.classList.add(className);
		}
	}, {
		key: 'calculateAndUpdateMidGradientColor',
		value: function calculateAndUpdateMidGradientColor(gradients) {
			var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
			var rgbOne = gradients.rgbOne,
			    rgbTwo = gradients.rgbTwo;

			var w = p * 2 - 1;
			var w1 = (w + 1) / 2.0;
			var w2 = 1 - w1;
			var midRGB = [Math.round(rgbOne[0] * w1 + rgbTwo[0] * w2), Math.round(rgbOne[1] * w1 + rgbTwo[1] * w2), Math.round(rgbOne[2] * w1 + rgbTwo[2] * w2)];
			GradientGenerator.midRGB = midRGB;
			GradientGenerator.defineColorBrightness();
			return midRGB;
		}
	}, {
		key: 'createRandomGradient',
		value: function createRandomGradient() {
			var R1 = GradientGenerator.getRandomRGBValue();
			var R2 = GradientGenerator.getRandomRGBValue();
			var G1 = GradientGenerator.getRandomRGBValue();
			var G2 = GradientGenerator.getRandomRGBValue();
			var B1 = GradientGenerator.getRandomRGBValue();
			var B2 = GradientGenerator.getRandomRGBValue();
			var gradients = {
				rgbOne: [R1, G1, B1],
				rgbTwo: [R2, G2, B2]
			};
			GradientGenerator.calculateAndUpdateMidGradientColor(gradients);
			return gradients;
		}
	}, {
		key: 'checkReducedValueOfArray',
		value: function checkReducedValueOfArray(array) {
			var reducer = function reducer(accumulator, currentValue) {
				return accumulator + currentValue;
			};
			return array.reduce(reducer) === 0;
		}
	}]);

	return GradientGenerator;
}();