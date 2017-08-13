//settings
currentColor1 = [0,0,0];
currentColor2 = [250,250,250];
fps = 120;
//conver current stop1 rgb to array
function getElementBG(rgb) {
	rgb	= rgb.match(/\((.*)\)/)[1];
	rgb	= rgb.split(",");
	for (var i = 0; i < rgb.length; i++) {
		rgb[i] = parseInt(rgb[i], 10);
	}
	if (rgb.length > 3) { rgb.pop(); }
	return rgb;
}
//create set of arrays of random numbers
var createRandomSet = function() {
	var color1	= [];
	var color2  = [];
	for (var i = 0; i < 6; i++) {
		var num = createColor();
		if (i <= 2){
			color1.push(num);
		}else{
			color2.push(num);
		}
	}
	return [color1,color2];
}
function calculateDistance(colorArray1, colorArray2) {
	var distance = [];
	for (var i = 0; i < colorArray1.length; i++) {
		distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
	}
	return distance;
}
// Calculates the increment values for R, G, and B using distance, fps, and duration.
// This calculation can be made in many different ways.
function calculateIncrement(distanceArray, fps) {
	var fps	= fps || 30;
	var duration	= duration || 3;
	var increment	= [];
	for (var i = 0; i < distanceArray.length; i++) {
		var incr = Math.abs(Math.floor(distanceArray[i] / (fps * 3)));
		if (incr == 0) {
			incr = 1;
		}
		increment.push(incr);
	}
	return increment;
}
var startTransition = function() {
	targetColor1 = createRandomSet()[0];
	targetColor2 = createRandomSet()[1];
	distance1	= calculateDistance(currentColor1, targetColor1);
	distance2 = calculateDistance(currentColor2, targetColor2);
	increment	= calculateIncrement(distance1, 60);
	window.transitionHandler = setInterval(function() {
		transitionGradient();
	}, 1000/120);
}
var transitionGradient = function() {
	// checking R
	if (currentColor1[0] > targetColor1[0]) {
		currentColor1[0] -= increment[0];
		if (currentColor1[0] <= targetColor1[0]) {
			increment[0] = 0;
		}
	} else {
		currentColor1[0] += increment[0];
		if (currentColor1[0] >= targetColor1[0]) {
			increment[0] = 0;
		}
	}
	// checking G
	if (currentColor1[1] > targetColor1[1]) {
		currentColor1[1] -= increment[1];
		if (currentColor1[1] <= targetColor1[1]) {
			increment[1] = 0;
		}
	} else {
		currentColor1[1] += increment[1];
		if (currentColor1[1] >= targetColor1[1]) {
			increment[1] = 0;
		}
	}
	// checking B
	if (currentColor1[2] > targetColor1[2]) {
		currentColor1[2] -= increment[2];
		if (currentColor1[2] <= targetColor1[2]) {
			increment[2] = 0;
		}
	} else {
		currentColor1[2] += increment[2];
		if (currentColor1[2] >= targetColor1[2]) {
			increment[2] = 0;
		}
	}
	applyChange();
	if (increment[0] == 0 && increment[1] == 0 && increment[2] == 0) {
		clearInterval(transitionHandler);
	}
}
var applyChange = function() {
	var stop = 'rgb(' + currentColor1[0] + ',' + currentColor1[1] + ',' + currentColor1[2] + ')';
	var gradient = 'linear-gradient(45deg,' + stop + ',' + stop2 + ')';
	$('.outer').css({'background': gradient});
}
