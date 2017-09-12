//settings
const fps = 260; // is there a better name for this?
const duration = 3; // duration of what?
const firstGrad = true; // what does this mean? 
//create set of arrays of random numbers
const createRandomGradient = () => ({ // return object literal
		rgbOne: [createColor(),createColor(),createColor()],
		rgbTwo: [createColor(),createColor(),createColor()]
});

const startTransition = hasLoaded => { // if it's a boolean, hasLoaded or isLoaded than onLoad, because onLoad sounds like a function
	const targetColor = createRandomGradient();
	targetColorOne = targetColor.rgbOne;
	targetColorOne = targetColor.rgbTwo;
	window.transitionHandler = setInterval( () => {
		transitionGradient(hasLoaded);
	}, 1000/fps);
}
const transitionGradient = onLoad => {
	currentColor = firstGrad ? colorArrayOne : colorArrayTwo;
	targetColor = firstGrad ? targetColorOne : targetColorOne // slight shortcut to what you were doing
	increment = onLoad ? [0,0,0] : [1,1,1];

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
	const cssGradient = `linear-gradient(45deg,${stopOne},${stopTwo})`;
	const outerElem = document.querySelector('.outer');
	const currentGradientState = {
		gradIndex: firstGrad ? this.gradIndex = 'one' : this.gradIndex = 'two',
		gradValue: firstGrad ? this.gardValue = stopOne : this.gardValue = stopTwo // gardValue? or gradValue ???
	}
	// is this what you want to do?
	// const currentGradientState = {
	// 	gradIndex: firstGrad ? 'one' : 'two',
	// 	gradValue: firstGrad ? stopOne : stopTwo
	// }
	if (supportsCssVars) {
		document.documentElement.style.setProperty(`--gradient-${currentGradientState.gradIndex}`,`${currentGradientState.gradValue}`);
	} else {
		outerElem.style.backgroundImage = cssGradient;
	}
	outerElem.classList.add('active');
	firstGrad = !firstGrad; // this is weird, what's it
}
