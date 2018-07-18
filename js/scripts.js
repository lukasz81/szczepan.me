//copyright: Lukasz Szczepanski of szczepan.me

const ROLE_TEXT_SWITCH = 4000;
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

let Gradient = new GradientGenerator();

const changRoleText = () => {
    setInterval(() => {
        const roleElem = document.querySelector('.role');
        const role = roles[Math.floor(Math.random() * roles.length)];
        const text = `${role}.`;
        roleElem.innerHTML = text;
        roleElem.setAttribute('data-text', ' ');

        let attributeHandler = setInterval(() => {
            roleElem.setAttribute('data-text', text);
            clearInterval(attributeHandler);
            attributeHandler = false;
        }, ROLE_TEXT_SWITCH * 0.75);

    }, ROLE_TEXT_SWITCH);
};

const toggleElementsClassnames = () => {
    const elements = '.outer , .inner , .heart';
    const elementsList = document.querySelectorAll(elements);
    const elementsArray = Array.from(elementsList);
    elementsArray.forEach(element => {
        element.classList.toggle('active');
    });
};

const addEventsToHeartButton = () => {
    const heartElem = document.querySelector('.heart');
    const innerElm = document.querySelector('.inner');
    heartElem.addEventListener('click', () => {
        toggleElementsClassnames();
        setTimeout(() => {
            Gradient.startTransition(false);
            innerElm.classList.add('active');
        }, DEF_DELAY);
    })
};

const addBrowserSupportClasses = () => {
    const HTMLElem = document.getElementsByTagName('html')[0];
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (CSS.supports('display', 'grid')) {
        HTMLElem.classList.add('css-grid');
    }
    if (CSS.supports('--fake-var', 0) || isSafari) {
        HTMLElem.classList.add('css-variables');
        Gradient.supportsCssVars = true;
    }
};

//after document has loaded
window.addEventListener('DOMContentLoaded', () => {
    addBrowserSupportClasses();
    let isFirstLoad = true;
    Gradient.startTransition(isFirstLoad);
    changRoleText();
    addEventsToHeartButton();
});
