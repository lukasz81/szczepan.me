//copyright: Lukasz Szczepanski of szczepan.me
let supportsCssVars = false;
const ROLE_TEXT_SWITCH = 10000;
const DEF_DELAY = 300;
const roles = [
	'UX Designer',
	'UI Designer',
	'UI Developer',
	'Front End Developer',
	'Designer',
	'UI Engineer',
	'Web Designer',
	'Web Developer',
	'Coder',
	'Human'
];
const changRoleText = () => {
	setInterval( () => {
		let roleElm = document.querySelector('.role');
		let random = Math.floor( Math.random() * roles.length);
		let role = roles[random];
		let txt  = `${role}.`;
		roleElm.innerHTML = txt;
		roleElm.setAttribute('data-text',' ');
		window.attributeHandler = setInterval( () => {
			roleElm.setAttribute('data-text',txt);
			clearInterval(attributeHandler);
		}, ROLE_TEXT_SWITCH * 0.75 );
	}, ROLE_TEXT_SWITCH );
}
const addRandomGradientColorOnLoad = () => {
	colorArrayOne = [createColor(),createColor(),createColor()];
	colorArrayTwo = [createColor(),createColor(),createColor()];
	startTransition(onLoad = true);
	toggleElementsClassnames();
}
const toggleElementsClassnames = () => {
	const allElements = Array.from(document.querySelectorAll('.outer , .inner , .heart'));
	allElements.forEach( e => {
		e.classList.toggle('active');
	});
}
//find number between 0 and 255
const createColor = () => {
	let value = randomNumber();
	return parseInt(value);
}
const randomNumber = () => {
	return Math.floor(Math.random() * 255);
}
//apply styles to head
const reloadStyleTags = (stop1,stop2) => {
	let style = document.getElementsByTagName('style')[0];
	if (style) {style.parentNode.removeChild(style)};
	const styleTag = `.comingSoon .glitch:before{ text-shadow:2px 0 ${stop2} }\n.comingSoon .glitch:after{ text-shadow:2px 0 ${stop1} }`;
	const styleSheet = document.createElement('style');
	styleSheet.innerHTML = styleTag;
	document.head.appendChild(styleSheet);
}
const addEventsToHeartButton = () => {
	const heart = document.querySelector('.heart');
	const inner = document.querySelector('.inner');
	heart.addEventListener('click', () => {
		toggleElementsClassnames();
		setTimeout( () => {
				startTransition();
				inner.classList.add('active');
		}, DEF_DELAY);
	})
}
const addBrowserSupportClasses = () => {
	const HTML = document.getElementsByTagName('html')[0];
	if (CSS.supports('display', 'grid')) {
		HTML.classList.add('css-grid');
	}
	if (CSS.supports('--fake-var', 0)){
		HTML.classList.add('css-variables');
		supportsCssVars = true;
	}
}
//after document has loaded
 window.addEventListener('DOMContentLoaded', () => {
	addRandomGradientColorOnLoad();
	changRoleText();
	addEventsToHeartButton();
	addBrowserSupportClasses();
});
