'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//settings
var fps = 260;
var firstGrad = true;

//create set of arrays of random numbers
var generateRandomRgbValue = function generateRandomRgbValue() {
    return Math.floor(Math.random() * 255);
};

var createRandomGradient = function createRandomGradient() {
    return {
        rgbOne: [generateRandomRgbValue(), generateRandomRgbValue(), generateRandomRgbValue()],
        rgbTwo: [generateRandomRgbValue(), generateRandomRgbValue(), generateRandomRgbValue()]
    };
};

var startTransition = function startTransition() {
    var targetColorOne = createRandomGradient().rgbOne;
    var targetColorTwo = createRandomGradient().rgbTwo;
    //applyTransitionToGradient(targetColorOne,targetColorTwo);
    window.transitionHandler = setInterval(function () {
        transitionGradient(targetColorOne, targetColorTwo);
    }, 1000 / fps);
};

var applyTransitionToGradient = function applyTransitionToGradient(targetColorOne, targetColorTwo) {
    var _currentColorOne = currentColorOne,
        _currentColorOne2 = _slicedToArray(_currentColorOne, 3),
        R_current_one = _currentColorOne2[0],
        G_current_one = _currentColorOne2[1],
        B_current_one = _currentColorOne2[2];

    var _currentColorTwo = currentColorTwo,
        _currentColorTwo2 = _slicedToArray(_currentColorTwo, 3),
        R_current_two = _currentColorTwo2[0],
        G_current_two = _currentColorTwo2[1],
        B_current_two = _currentColorTwo2[2];

    var _targetColorOne = _slicedToArray(targetColorOne, 3),
        R_target_one = _targetColorOne[0],
        G_target_one = _targetColorOne[1],
        B_target_one = _targetColorOne[2];

    var _targetColorTwo = _slicedToArray(targetColorTwo, 3),
        R_target_two = _targetColorTwo[0],
        G_target_two = _targetColorTwo[1],
        B_target_two = _targetColorTwo[2];

    console.log('currentArrayOne => ', R_current_one, G_current_one, B_current_one);
    console.log('targetColorOne => ', R_target_one, G_target_one, B_target_one);
    console.log('currentArrayTwo =>', R_current_two, G_current_two, B_current_two);
    console.log('targetColorTwo =>', R_target_two, G_target_two, B_target_two);

    //TODO figure out loop logic here after destructuring to be able to transition the gradient
};

var transitionGradient = function transitionGradient(targetColorOne, targetColorTwo) {
    var currentColor = firstGrad ? currentColorOne : currentColorTwo;
    var targetColor = firstGrad ? targetColorOne : targetColorTwo;
    var increment = [1, 1, 1];

    // checking R
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

    var _currentColorOne3 = currentColorOne,
        _currentColorOne4 = _slicedToArray(_currentColorOne3, 3),
        R1 = _currentColorOne4[0],
        G1 = _currentColorOne4[1],
        B1 = _currentColorOne4[2];

    var _currentColorTwo3 = currentColorTwo,
        _currentColorTwo4 = _slicedToArray(_currentColorTwo3, 3),
        R2 = _currentColorTwo4[0],
        G2 = _currentColorTwo4[1],
        B2 = _currentColorTwo4[2];

    var stopOne = 'rgb(' + R1 + ' , ' + G1 + ' , ' + B1 + ')';
    var stopTwo = 'rgb(' + R2 + ' , ' + G2 + ' , ' + B2 + ')';

    if (increment.reduce(function (a, b) {
        return a + b;
    }) === 0) {
        reloadStyleTags(stopOne, stopTwo);
        clearInterval(transitionHandler);
        document.querySelector('.heart').classList.add('active');
    }

    applyChange(stopOne, stopTwo);
};

var applyChange = function applyChange(stopOne, stopTwo) {

    var cssGradient = 'linear-gradient(45deg,' + stopOne + ',' + stopTwo + ')';
    var outer = document.querySelector('.outer');
    var currentGradientState = {
        gradIndex: firstGrad ? 'one' : 'two',
        gradValue: firstGrad ? stopOne : stopTwo
    };

    if (supportsCssVars) {
        document.documentElement.style.setProperty('--gradient-' + currentGradientState.gradIndex, '' + currentGradientState.gradValue);
    } else {
        outer.style.backgroundImage = cssGradient;
    }

    outer.classList.add('active');
    firstGrad = !firstGrad;
};
//# sourceMappingURL=gradient-generator.js.map