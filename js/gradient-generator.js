//settings
const fps = 260;
const duration = 3;
let firstGrad = true;
//create set of arrays of random numbers
const createRandomGradient = () => {
	let gradient = {
		rgbOne: [createColor(),createColor(),createColor()],
		rgbTwo: [createColor(),createColor(),createColor()]
	};
	return gradient;
}
const startTransition = (onLoad) => {
	let targetColor = createRandomGradient();
	targetColorOne = targetColor.rgbOne;
	targetColorTwo = targetColor.rgbTwo;
	window.transitionHandler = setInterval( () => {
		transitionGradient(onLoad);
	}, 1000/fps);
}
const transitionGradient = (onLoad) => {
	firstGrad ? currentColor = colorArrayOne : currentColor = colorArrayTwo;
	firstGrad ? targetColor = targetColorOne : targetColor = targetColorTwo;
	onLoad ? increment = [0,0,0] : increment = [1,1,1];

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

	stopOne = `rgb(${colorArrayOne[0]} , ${colorArrayOne[1]} , ${colorArrayOne[2]})`;
	stopTwo = `rgb(${colorArrayTwo[0]} , ${colorArrayTwo[1]} , ${colorArrayTwo[2]})`;

	if (increment[0] === 0 && increment[1] === 0 && increment[2] === 0) {
		reloadStyleTags(stopOne,stopTwo);
		clearInterval(transitionHandler);
		document.querySelector('.heart').classList.add('active');
	}
	applyChange();
}
const applyChange = () => {
	let cssGradient = `linear-gradient(45deg,${stopOne},${stopTwo})`;
	let outer = document.querySelector('.outer');
	outer.style.backgroundImage = cssGradient;
	outer.classList.add('active');
	firstGrad = !firstGrad;
}
