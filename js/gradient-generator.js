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
	const differ = [
		targetColorOne[0] - colorArrayOne[0],
		targetColorOne[1] - colorArrayOne[1],
		targetColorOne[2] - colorArrayOne[2]
	]

	console.log(colorArrayOne,targetColorOne,differ);

	const DELAY = 10;

	for (let index = 1; index < differ[0]; index++) {
		setTimeout( () => {
        console.log('0:',index);
    }, index*DELAY );
	}

	for (let index = 1; index < differ[1]; index++) {
		setTimeout( () => {
				console.log('1:',index);
		}, index*DELAY );
	}

	for (let index = 1; index < differ[2]; index++) {
		setTimeout( () => {
				console.log('2:',index);
		}, index*DELAY );
	}
	// for (let index = 0; index < A[1]; index++) {
	// 	console.log('1:',index);
	// }
	// for (let index = 0; index < A[2]; index++) {
	// 	console.log('2:',index);
	// }
}

const transitionGradient = onLoad => {
	// console.log('c1: ', colorArrayOne);
	// console.log('t1: ', targetColorOne);
	// console.log('d1: ', [
	// 	targetColorOne[0] - colorArrayOne[0],
	// 	targetColorOne[1] - colorArrayOne[1],
	// 	targetColorOne[2] - colorArrayOne[2]
	// ]);
	//
	// console.log('c2: ', colorArrayTwo);
	// console.log('t2: ', targetColorTwo);
	// console.log('d2: ', [
	// 	targetColorTwo[0] - colorArrayTwo[0],
	// 	targetColorTwo[1] - colorArrayTwo[1],
	// 	targetColorTwo[2] - colorArrayTwo[2]
	// ]);

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
