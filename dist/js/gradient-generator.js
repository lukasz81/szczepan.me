'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GradientGenerator = exports.GradientGenerator = function () {
    function GradientGenerator() {
        _classCallCheck(this, GradientGenerator);

        this.DELAY = 10;
        this.firstGrad = true;
        this.isFirstLoad = true;
        this.supportsCssVars = false;
        this.prevColors = { targetColorOne: [0, 0, 0], targetColorTwo: [0, 0, 0] };
        this.transitionHandler = null;
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
        key: 'transitionGradient',
        value: function transitionGradient(onLoad, targetColorOne, targetColorTwo) {

            var currentColor = this.firstGrad ? this.prevColors.targetColorOne : this.prevColors.targetColorTwo;
            var targetColor = this.firstGrad ? targetColorOne : targetColorTwo;
            var increment = onLoad ? [0, 0, 0] : [1, 1, 1];

            // checking G
            if (currentColor[0] > targetColor[0]) {
                currentColor[0] -= increment[0];
                if (currentColor[0] <= targetColor[0]) {
                    increment[0] = 0;
                }
            } else {
                currentColor[0] += increment[0];
                if (currentColor[0] >= targetColor[0]) {
                    increment[0] = 0;
                }
            }
            // checking G
            if (currentColor[1] > targetColor[1]) {
                currentColor[1] -= increment[1];
                if (currentColor[1] <= targetColor[1]) {
                    increment[1] = 0;
                }
            } else {
                currentColor[1] += increment[1];
                if (currentColor[1] >= targetColor[1]) {
                    increment[1] = 0;
                }
            }
            // checking B
            if (currentColor[2] > targetColor[2]) {
                currentColor[2] -= increment[2];
                if (currentColor[2] <= targetColor[2]) {
                    increment[2] = 0;
                }
            } else {
                currentColor[2] += increment[2];
                if (currentColor[2] >= targetColor[2]) {
                    increment[2] = 0;
                }
            }

            var stopOne = 'rgb(' + this.prevColors.targetColorOne[0] + ' , ' + this.prevColors.targetColorOne[1] + ' , ' + this.prevColors.targetColorOne[2] + ')';
            var stopTwo = 'rgb(' + this.prevColors.targetColorTwo[0] + ' , ' + this.prevColors.targetColorTwo[1] + ' , ' + this.prevColors.targetColorTwo[2] + ')';

            this.applyChange(stopOne, stopTwo);

            var incrementTotalValueIsZero = increment.reduce(function (sum) {
                return sum;
            }) === 0;

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
        key: 'applyChange',
        value: function applyChange(stopOne, stopTwo) {
            var outerElem = document.querySelector('.outer');
            if (this.supportsCssVars) {
                document.documentElement.style.setProperty('--gradient-one', '' + stopOne);
                document.documentElement.style.setProperty('--gradient-two', '' + stopTwo);
            } else {
                outerElem.style.backgroundImage = 'linear-gradient(45deg,' + stopOne + ',' + stopTwo + ')';
            }
            outerElem.classList.add('active');
            this.firstGrad = !this.firstGrad;
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
    }]);

    return GradientGenerator;
}();
//# sourceMappingURL=gradient-generator.js.map