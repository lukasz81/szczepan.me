'use strict';

//copyright: Lukasz Szczepanski of szczepan.me
var supportsCssVars = false;
var ROLE_TEXT_SWITCH = 6000;
var DEF_DELAY = 300;
var roles = ['UX Designer', 'UI Designer', 'UI Developer', 'Front End Developer', 'Designer', 'UI Engineer', 'Web Designer', 'Web Developer', 'Coder', 'Human'];

var changRoleText = function changRoleText() {
	setInterval(function () {
		var roleElm = document.querySelector('.role');
		var random = Math.floor(Math.random() * roles.length);
		var role = roles[random];
		var txt = role + '.';
		roleElm.innerHTML = txt;
		roleElm.setAttribute('data-text', ' ');

		var attributeHandler = setInterval(function () {
			roleElm.setAttribute('data-text', txt);
			clearInterval(attributeHandler);
			attributeHandler = false;
		}, ROLE_TEXT_SWITCH * 0.75);
	}, ROLE_TEXT_SWITCH);
};

var toggleElementsClassNames = function toggleElementsClassNames() {
	var allElements = Array.from(document.querySelectorAll('.outer , .inner , .heart'));
	allElements.forEach(function (e) {
		return e.classList.toggle('active');
	});
};

var addRandomGradientColorOnLoad = function addRandomGradientColorOnLoad() {
	window.currentColorOne = createRandomGradient().rgbOne;
	window.currentColorTwo = createRandomGradient().rgbTwo;
	var stopOne = 'rgb(' + currentColorOne[0] + ' , ' + currentColorOne[1] + ' , ' + currentColorOne[2] + ')';
	var stopTwo = 'rgb(' + currentColorTwo[0] + ' , ' + currentColorTwo[1] + ' , ' + currentColorTwo[2] + ')';
	//startTransition();
	toggleElementsClassNames();
	applyChange(stopOne, stopTwo);
};

//apply styles to head
var reloadStyleTags = function reloadStyleTags(gradientStopOne, gradientStopTwo) {
	var style = document.getElementsByTagName('style')[0];
	{
		style && style.parentNode.removeChild(style);
	}
	var styleTag = '.comingSoon .glitch:before{ text-shadow:2px 0 ' + gradientStopTwo + ' }\n.comingSoon .glitch:after{ text-shadow:2px 0 ' + gradientStopOne + ' }';
	var styleSheet = document.createElement('style');
	styleSheet.innerHTML = styleTag;
	document.head.appendChild(styleSheet);
};

var addEventsToHeartButton = function addEventsToHeartButton() {
	var heart = document.querySelector('.heart');
	var inner = document.querySelector('.inner');
	heart.addEventListener('click', function () {
		toggleElementsClassNames();
		setTimeout(function () {
			startTransition();
			inner.classList.add('active');
		}, DEF_DELAY);
	});
};

var addBrowserSupportClasses = function addBrowserSupportClasses() {

	var HTML = document.getElementsByTagName('html')[0];

	if (CSS.supports('display', 'grid')) {
		HTML.classList.add('css-grid');
	}

	if (CSS.supports('--fake-var', 0)) {
		HTML.classList.add('css-variables');
		supportsCssVars = true;
	}
};

//after document has loaded
window.addEventListener('DOMContentLoaded', function () {
	addBrowserSupportClasses();
	addRandomGradientColorOnLoad();
	changRoleText();
	addEventsToHeartButton();
});
//# sourceMappingURL=scripts.js.map