'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import {applyGradientToVanvas} from './canvas-gradient';
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
        this.transitionHandler = null;
        this.increment = null;
    }

    _createClass(GradientGenerator, [{
        key: 'startTransition',
        value: function startTransition(isFirstLoad) {
            var _this = this;

            this.isFirstLoad = isFirstLoad;
            var targetColorOne = GradientGenerator.createRandomGradient().rgbOne;
            var targetColorTwo = GradientGenerator.createRandomGradient().rgbTwo;
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
                this.reloadStyleTags(stopOne, stopTwo);
                document.querySelector('.heart').classList.add('active');
                clearInterval(this.transitionHandler);
            }
        }
    }, {
        key: 'reloadStyleTags',


        //apply styles to head
        value: function reloadStyleTags(stopOne, stopTwo) {
            var styleElem = document.getElementById('tags');
            if (styleElem) styleElem.parentNode.removeChild(styleElem);
            var styleContent = '.comingSoon .glitch:before{ text-shadow:2px 0 ' + stopTwo + ' }\n.comingSoon .glitch:after{ text-shadow:2px 0 ' + stopOne + ' }';
            var styleSheet = document.createElement('style');
            styleSheet.id = 'tags';
            styleSheet.innerHTML = styleContent;
            document.head.appendChild(styleSheet);
        }
    }, {
        key: 'applyCanvasGradient',
        value: function applyCanvasGradient(stopOne, stopTwo) {
            // check if it is node env. Run only if it's not until I figure out testing paper.js
            if (typeof process === 'undefined') {
                return applyGradientToCanvas(stopOne, stopTwo);
            } else {
                return 'Developer needs more time to learn testing paper.js';
            }
        }
    }, {
        key: 'applyChange',
        value: function applyChange(stopOne, stopTwo) {
            var outerElem = document.querySelector('.outer');
            outerElem.classList.add('active');
            if (this.supportsCssVars) {
                document.documentElement.style.setProperty('--gradient-one', '' + stopOne);
                document.documentElement.style.setProperty('--gradient-two', '' + stopTwo);
            } else {
                outerElem.style.backgroundImage = 'linear-gradient(45deg,' + stopOne + ',' + stopTwo + ')';
            }
            this.firstGrad = !this.firstGrad;
            this.applyCanvasGradient(stopOne, stopTwo);
            // view.pause();
        }
    }], [{
        key: 'getRandomRGBValue',
        value: function getRandomRGBValue() {
            return Math.floor(Math.random() * 255);
        }
    }, {
        key: 'createRandomGradient',
        value: function createRandomGradient() {
            return {
                rgbOne: [GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue()],
                rgbTwo: [GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue()]
            };
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