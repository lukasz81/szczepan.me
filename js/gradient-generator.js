//settings
const fps = 260;
let firstGrad = true;

//create set of arrays of random numbers
const generateRandomRgbValue = () => {
    return Math.floor(Math.random() * 255);
};

const createRandomGradient = () => {
    return {
        rgbOne: [generateRandomRgbValue(), generateRandomRgbValue(), generateRandomRgbValue()],
        rgbTwo: [generateRandomRgbValue(), generateRandomRgbValue(), generateRandomRgbValue()]
    };
};

const startTransition = () => {
    let targetColorOne = createRandomGradient().rgbOne;
    let targetColorTwo = createRandomGradient().rgbTwo;
    //applyTransitionToGradient(targetColorOne,targetColorTwo);
    window.transitionHandler = setInterval(() => {
        transitionGradient(targetColorOne,targetColorTwo);
    }, 1000 / fps);
};

const applyTransitionToGradient = (targetColorOne,targetColorTwo) => {

    let [R_current_one,G_current_one,B_current_one] = currentColorOne;
    let [R_current_two,G_current_two,B_current_two] = currentColorTwo;
    let [R_target_one,G_target_one,B_target_one] = targetColorOne;
    let [R_target_two,G_target_two,B_target_two] = targetColorTwo;
    console.log('currentArrayOne => ',R_current_one,G_current_one,B_current_one);
    console.log('targetColorOne => ',R_target_one,G_target_one,B_target_one);
    console.log('currentArrayTwo =>',R_current_two,G_current_two,B_current_two);
    console.log('targetColorTwo =>',R_target_two,G_target_two,B_target_two);

    //TODO figure out loop logic here after destructuring to be able to transition the gradient
};

const transitionGradient = (targetColorOne,targetColorTwo) => {
    let currentColor = firstGrad ? currentColorOne : currentColorTwo;
    let targetColor = firstGrad ? targetColorOne : targetColorTwo;
    let increment = [1, 1, 1];

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

    let [R1,G1,B1] = currentColorOne;
    let [R2,G2,B2] = currentColorTwo;
    let stopOne = `rgb(${R1} , ${G1} , ${B1})`;
    let stopTwo = `rgb(${R2} , ${G2} , ${B2})`;

    if (increment.reduce((a,b) => a + b) === 0) {
        reloadStyleTags(stopOne, stopTwo);
        clearInterval(transitionHandler);
        document.querySelector('.heart').classList.add('active');
    }

    applyChange(stopOne,stopTwo);
};

const applyChange = (stopOne,stopTwo) => {

    let cssGradient = `linear-gradient(45deg,${stopOne},${stopTwo})`;
    let outer = document.querySelector('.outer');
    let currentGradientState = {
        gradIndex: firstGrad ? 'one' : 'two',
        gradValue: firstGrad ? stopOne : stopTwo
    };

    if (supportsCssVars) {
        document.documentElement.style.setProperty(`--gradient-${currentGradientState.gradIndex}`, `${currentGradientState.gradValue}`);
    } else {
        outer.style.backgroundImage = cssGradient;
    }

    outer.classList.add('active');
    firstGrad = !firstGrad;
};
