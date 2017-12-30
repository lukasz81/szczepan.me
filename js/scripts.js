//copyright: Lukasz Szczepanski of szczepan.me
let supportsCssVars = false;
const ROLE_TEXT_SWITCH = 6000;
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

		let attributeHandler = setInterval( () => {
			roleElm.setAttribute('data-text',txt);
			clearInterval(attributeHandler);
			attributeHandler = false;
		}, ROLE_TEXT_SWITCH * 0.75 );

	}, ROLE_TEXT_SWITCH );
};

const toggleElementsClassNames = () => {
	const allElements = Array.from(document.querySelectorAll('.outer , .inner , .heart'));
	allElements.forEach( e => e.classList.toggle('active'));
};

const addRandomGradientColorOnLoad = () => {
    window.currentColorOne = createRandomGradient().rgbOne;
    window.currentColorTwo = createRandomGradient().rgbTwo;
    let stopOne = `rgb(${currentColorOne[0]} , ${currentColorOne[1]} , ${currentColorOne[2]})`;
    let stopTwo = `rgb(${currentColorTwo[0]} , ${currentColorTwo[1]} , ${currentColorTwo[2]})`;
    //startTransition();
    toggleElementsClassNames();
    applyChange(stopOne,stopTwo);
};

//apply styles to head
const reloadStyleTags = (gradientStopOne,gradientStopTwo) => {
	let style = document.getElementsByTagName('style')[0];
    {style && style.parentNode.removeChild(style)}
	const styleTag = `.comingSoon .glitch:before{ text-shadow:2px 0 ${gradientStopTwo} }\n.comingSoon .glitch:after{ text-shadow:2px 0 ${gradientStopOne} }`;
	const styleSheet = document.createElement('style');
	styleSheet.innerHTML = styleTag;
	document.head.appendChild(styleSheet);
};

const addEventsToHeartButton = () => {
	const heart = document.querySelector('.heart');
	const inner = document.querySelector('.inner');
	heart.addEventListener('click', () => {
		toggleElementsClassNames();
		setTimeout( () => {
				startTransition();
				inner.classList.add('active');
		}, DEF_DELAY);
	})
};

const addBrowserSupportClasses = () => {

	const HTML = document.getElementsByTagName('html')[0];

	if (CSS.supports('display', 'grid')) {
		HTML.classList.add('css-grid');
	}

	if (CSS.supports('--fake-var', 0)){
		HTML.classList.add('css-variables');
		supportsCssVars = true;
	}
};

//after document has loaded
 window.addEventListener('DOMContentLoaded', () => {
     addBrowserSupportClasses();
     addRandomGradientColorOnLoad();
     changRoleText();
     addEventsToHeartButton();
});
