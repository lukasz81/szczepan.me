//settings
const FRAMES_RATE = 240;
let firstGrad = true;
//create set of arrays of random numbers
const createRandomGradient = () => ({
		rgbOne: [getRandomRGBValue(),getRandomRGBValue(),getRandomRGBValue()],
		rgbTwo: [getRandomRGBValue(),getRandomRGBValue(),getRandomRGBValue()]
});
const startTransition = hasLoaded => {
	const targetColor = createRandomGradient();
	targetColorOne = targetColor.rgbOne;
	targetColorTwo = targetColor.rgbTwo;
	window.transitionHandler = setInterval( () => {
		transitionGradient(hasLoaded);
	}, 1000/FRAMES_RATE);
	testLoop();
}
const testLoop = () => {

	const differenceOfTheGradientColors = () => ({
			'differenceRed': firstGrad ? (targetColorOne[0] - colorArrayOne[0]) : (targetColorTwo[0] - colorArrayTwo[0]),
			'differenceGreen': firstGrad ? (targetColorOne[1] - colorArrayOne[1]) : (targetColorTwo[1] - colorArrayTwo[1]),
			'differenceBlue': firstGrad ? (targetColorOne[2] - colorArrayOne[2]) : (targetColorTwo[2] - colorArrayTwo[2])
		})

	const DIFF = differenceOfTheGradientColors();
	const DELAY = 100;
	const RED = {
		'sign': DIFF.differenceRed > 0 ? '+' : '-',
		'value': Array.from(Array(Math.abs(DIFF.differenceRed)).keys())
	}
	// const GREEN = Array.from(Array(DIFF.differenceGreen).keys());
	// const BLUE = Array.from(Array(DIFF.differenceBlue).keys());

	for (let value of RED.value) {
  	RED.sign === '+' ? value++ : value--;
		setTimeout(() => {
		  console.log('R: ',value,' firstGrad: ',firstGrad,' differenceOfTheGradientColors: ',RED);
		}, DELAY*value);
	}

}

const transitionGradient = onLoad => {
	let currentColor = firstGrad ? colorArrayOne : colorArrayTwo;
	let targetColor = firstGrad ? targetColorOne : targetColorTwo;
	let increment = onLoad ? [0,0,0] : [1,1,1];

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

	const stopOne = `rgb(${colorArrayOne[0]} , ${colorArrayOne[1]} , ${colorArrayOne[2]})`;
	const stopTwo = `rgb(${colorArrayTwo[0]} , ${colorArrayTwo[1]} , ${colorArrayTwo[2]})`;

	applyChange(stopOne,stopTwo);
	if (increment[0] === 0 && increment[1] === 0 && increment[2] === 0) {
		reloadStyleTags(stopOne,stopTwo);
		document.querySelector('.heart').classList.add('active');
		clearInterval(transitionHandler);
	}

}
const applyChange = (stopOne,stopTwo) => {
	const outerElem = document.querySelector('.outer');
	if (supportsCssVars) {
		document.documentElement.style.setProperty(`--gradient-one`,`${stopOne}`);
		document.documentElement.style.setProperty(`--gradient-two`,`${stopTwo}`);
	} else {
		const cssGradient = `linear-gradient(45deg,${stopOne},${stopTwo})`;
		outerElem.style.backgroundImage = cssGradient;
	}
	outerElem.classList.add('active');
	firstGrad = !firstGrad;
}
