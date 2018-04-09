'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GradientGenerator = function () {
    function GradientGenerator() {
        _classCallCheck(this, GradientGenerator);

        this.FRAMES_RATE = 240;
        this.firstGrad = true;
        this.prevColors = {};
    }

    _createClass(GradientGenerator, [{
        key: 'addRandomGradientColorOnLoad',
        value: function addRandomGradientColorOnLoad() {
            var colorArrayOne = GradientGenerator.createRandomGradient().rgbOne;
            var colorArrayTwo = GradientGenerator.createRandomGradient().rgbTwo;
            this.prevColors = { colorArrayOne: colorArrayOne, colorArrayTwo: colorArrayTwo };
            toggleElementsClassnames();
        }
    }, {
        key: 'startTransition',
        value: function startTransition(isFirstLoad) {
            var _this = this;

            if (isFirstLoad) this.addRandomGradientColorOnLoad();
            var targetColorOne = GradientGenerator.createRandomGradient().rgbOne;
            var targetColorTwo = GradientGenerator.createRandomGradient().rgbTwo;
            window.transitionHandler = setInterval(function () {
                _this.transitionGradient(isFirstLoad, targetColorOne, targetColorTwo);
            }, 1000 / this.FRAMES_RATE);
        }
    }, {
        key: 'transitionGradient',
        value: function transitionGradient(onLoad, targetColorOne, targetColorTwo) {
            var currentColor = this.firstGrad ? this.prevColors.colorArrayOne : this.prevColors.colorArrayTwo;
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

            var stopOne = 'rgb(' + this.prevColors.colorArrayOne[0] + ' , ' + this.prevColors.colorArrayOne[1] + ' , ' + this.prevColors.colorArrayOne[2] + ')';
            var stopTwo = 'rgb(' + this.prevColors.colorArrayTwo[0] + ' , ' + this.prevColors.colorArrayTwo[1] + ' , ' + this.prevColors.colorArrayTwo[2] + ')';

            this.applyChange(stopOne, stopTwo);

            if (increment[0] === 0 && increment[1] === 0 && increment[2] === 0) {
                reloadStyleTags(stopOne, stopTwo);
                document.querySelector('.heart').classList.add('active');
                clearInterval(transitionHandler);
            }
        }
    }, {
        key: 'applyChange',
        value: function applyChange(stopOne, stopTwo) {
            var outerElem = document.querySelector('.outer');
            if (supportsCssVars) {
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

// const testLoop = () => {
//
//     const differenceOfTheGradientColors = () => ({
//         'differenceRed': firstGrad ? (targetColorOne[0] - colorArrayOne[0]) : (targetColorTwo[0] - colorArrayTwo[0]),
//         'differenceGreen': firstGrad ? (targetColorOne[1] - colorArrayOne[1]) : (targetColorTwo[1] - colorArrayTwo[1]),
//         'differenceBlue': firstGrad ? (targetColorOne[2] - colorArrayOne[2]) : (targetColorTwo[2] - colorArrayTwo[2])
//     });
//
//     const DIFF = differenceOfTheGradientColors();
//     const DELAY = 100;
//     const RED = {
//         'sign': DIFF.differenceRed > 0 ? '+' : '-',
//         'value': Array.from(Array(Math.abs(DIFF.differenceRed)).keys())
//     };
//     // const GREEN = Array.from(Array(DIFF.differenceGreen).keys());
//     // const BLUE = Array.from(Array(DIFF.differenceBlue).keys());
//
//     for (let value of RED.value) {
//         RED.sign === '+' ? value++ : value--;
//         setTimeout(() => {
//             console.log('R: ', value, ' firstGrad: ', firstGrad, ' differenceOfTheGradientColors: ', RED);
//         }, DELAY * value);
//     }
//
// };
//# sourceMappingURL=gradient-generator.js.map