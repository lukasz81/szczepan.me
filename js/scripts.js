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
		const roleElem = document.querySelector('.role');
		const role = roles[Math.floor( Math.random() * roles.length)];
		const text  = `${role}.`;
		roleElem.innerHTML = text;
		roleElem.setAttribute('data-text',' ');

		let attributeHandler = setInterval( () => {
			roleElem.setAttribute('data-text',text);
			clearInterval(attributeHandler);
			attributeHandler = false;
		}, ROLE_TEXT_SWITCH * 0.75 );

	}, ROLE_TEXT_SWITCH );
};

const toggleElementsClassnames = () => {
    const elementsList = document.querySelectorAll('.outer , .inner , .heart');
    const elementsArray = Array.from(elementsList);
    elementsArray.forEach(element => {
        element.classList.toggle('active');
    });
};

//apply styles to head
const reloadStyleTags = (stop1, stop2) => {
	const styleElem = document.getElementsByTagName('style')[0];

	if (styleElem) styleElem.parentNode.removeChild(styleElem);

	const styleTag = `.comingSoon .glitch:before{ text-shadow:2px 0 ${stop2} }\n.comingSoon .glitch:after{ text-shadow:2px 0 ${stop1} }`;
	const styleSheet = document.createElement('style');

	styleSheet.innerHTML = styleTag;
	document.head.appendChild(styleSheet);
};

const addEventsToHeartButton = () => {
	const heartElem = document.querySelector('.heart');
	const innerElm = document.querySelector('.inner');
	heartElem.addEventListener('click', () => {
		toggleElementsClassnames();
		setTimeout( () => {
			startTransition(false);
            innerElm.classList.add('active');
		}, DEF_DELAY);
	})
};

const addBrowserSupportClasses = () => {
	const HTMLElem = document.getElementsByTagName('html')[0];
	if (CSS.supports('display', 'grid')) {
		HTMLElem.classList.add('css-grid');
	}
	if (CSS.supports('--fake-var', '0')){
		HTMLElem.classList.add('css-variables');
		supportsCssVars = true;
	}
};

//after document has loaded
 window.addEventListener('DOMContentLoaded', () => {
	addRandomGradientColorOnLoad();
	changRoleText();
	addEventsToHeartButton();
	addBrowserSupportClasses();
});
