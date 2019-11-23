import {GradientGenerator} from './gradient-generator.js';
import {InitScripts} from './scripts.js';
paper.install(window);
window.addEventListener('DOMContentLoaded', () => {
	let Gradient = new GradientGenerator();
	let Init = new InitScripts(Gradient);
	Init.addBrowserSupportClasses();
	Init.startInitialTransition(true);
	Init.changRoleText();
	Init.addEventsToHeartButton();
	Init.toggleTooltipClassNamesOnHover();
	let canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
});