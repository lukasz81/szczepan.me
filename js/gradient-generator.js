class GradientGenerator {

    constructor(gradient_one, gradient_two) {
        this.gradient_one = gradient_one;
        this.gradient_two = gradient_two;
        this.FRAMES_RATE = 240;
        this.firstGrad = true;
    }

    createRandomGradient() {
        return {
            rgbOne: [getRandomRGBValue(), getRandomRGBValue(), getRandomRGBValue()],
            rgbTwo: [getRandomRGBValue(), getRandomRGBValue(), getRandomRGBValue()]
        }
    };

    startTransition(hasLoaded) {
        const targetColor = this.createRandomGradient();
        //window.targetColorOne = targetColor.rgbOne;
        //window.targetColorTwo = targetColor.rgbTwo;
        // window.transitionHandler = setInterval(() => {
        //     transitionGradient(hasLoaded);
        // }, 1000 / this.FRAMES_RATE);
        this.testLoop();
    };

    testLoop() {
        console.log('test Loop init');
    }

}

//settings
const FRAMES_RATE = 240;
let firstGrad = true;

let stateModule = (function () {
    let state;
    let pub = {};
    pub.setState = function (newState) {
        state = newState;
    };
    pub.getState = function() {
        return state;
    };
    return pub; // expose externally
}());

const getRandomRGBValue = () => Math.floor(Math.random() * 255);

//create set of arrays of random numbers
const createRandomGradient = () => ({
    rgbOne: [getRandomRGBValue(), getRandomRGBValue(), getRandomRGBValue()],
    rgbTwo: [getRandomRGBValue(), getRandomRGBValue(), getRandomRGBValue()]
});

const addRandomGradientColorOnLoad = () => {
    const targetColor = createRandomGradient();
    const colorArrayOne = targetColor.rgbOne;
    const colorArrayTwo = targetColor.rgbTwo;
    stateModule.setState({prevColors: {colorArrayOne,colorArrayTwo}});
    startTransition(true);
    toggleElementsClassnames();
    console.log('once?');
};

const startTransition = (hasLoaded) => {
    const targetColor = createRandomGradient();
    const targetColorOne = targetColor.rgbOne;
    const targetColorTwo = targetColor.rgbTwo;
    window.transitionHandler = setInterval(() => {
        transitionGradient(hasLoaded, targetColorOne, targetColorTwo);
    }, 1000 / FRAMES_RATE);
    //testLoop();
};

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

const transitionGradient = (onLoad, targetColorOne, targetColorTwo) => {
    const { prevColors } = stateModule.getState();
    let currentColor = firstGrad ? prevColors.colorArrayOne : prevColors.colorArrayTwo;
    let targetColor = firstGrad ? targetColorOne : targetColorTwo;
    let increment = onLoad ? [0, 0, 0] : [1, 1, 1];

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

    const stopOne = `rgb(${prevColors.colorArrayOne[0]} , ${prevColors.colorArrayOne[1]} , ${prevColors.colorArrayOne[2]})`;
    const stopTwo = `rgb(${prevColors.colorArrayTwo[0]} , ${prevColors.colorArrayTwo[1]} , ${prevColors.colorArrayTwo[2]})`;

    applyChange(stopOne, stopTwo);

    if (increment[0] === 0 && increment[1] === 0 && increment[2] === 0) {
        reloadStyleTags(stopOne, stopTwo);
        document.querySelector('.heart').classList.add('active');
        clearInterval(transitionHandler);
    }
};

const applyChange = (stopOne, stopTwo) => {
    const outerElem = document.querySelector('.outer');
    if (supportsCssVars) {
        document.documentElement.style.setProperty(`--gradient-one`, `${stopOne}`);
        document.documentElement.style.setProperty(`--gradient-two`, `${stopTwo}`);
    } else {
        const cssGradient = `linear-gradient(45deg,${stopOne},${stopTwo})`;
        outerElem.style.backgroundImage = cssGradient;
    }
    outerElem.classList.add('active');
    firstGrad = !firstGrad;
};

