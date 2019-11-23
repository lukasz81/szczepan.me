'use strict';

var _gradientGenerator = require('./gradient-generator.js');

var _scripts = require('./scripts.js');

paper.install(window);
window.addEventListener('DOMContentLoaded', function () {
	var Gradient = new _gradientGenerator.GradientGenerator();
	var Init = new _scripts.InitScripts(Gradient);
	Init.addBrowserSupportClasses();
	Init.startInitialTransition(true);
	Init.changRoleText();
	Init.addEventsToHeartButton();
	Init.toggleTooltipClassNamesOnHover();
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
});