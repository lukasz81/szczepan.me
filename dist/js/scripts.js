'use strict';

//copyright: Lukasz Szczepanski of szczepan.me
var ROLE_TEXT_SWITCH = 4000;
var DEF_DELAY = 300;
var roles = ['UX Designer', 'UI Designer', 'UI Developer', 'Front End Developer', 'Designer', 'UI Engineer', 'Web Designer', 'Web Developer', 'Coder', 'Human'];

var Gradient = new GradientGenerator();

var changRoleText = function changRoleText() {
    setInterval(function () {
        var roleElem = document.querySelector('.role');
        var role = roles[Math.floor(Math.random() * roles.length)];
        var text = role + '.';
        roleElem.innerHTML = text;
        roleElem.setAttribute('data-text', ' ');

        var attributeHandler = setInterval(function () {
            roleElem.setAttribute('data-text', text);
            clearInterval(attributeHandler);
            attributeHandler = false;
        }, ROLE_TEXT_SWITCH * 0.75);
    }, ROLE_TEXT_SWITCH);
};

var toggleElementsClassNames = function toggleElementsClassNames() {
    var elements = '.outer , .inner , .heart';
    var elementsList = document.querySelectorAll(elements);
    var elementsArray = Array.from(elementsList);
    elementsArray.forEach(function (element) {
        element.classList.toggle('active');
    });
};

var addEventsToHeartButton = function addEventsToHeartButton() {
    var heartElem = document.querySelector('.heart');
    var innerElm = document.querySelector('.inner');
    heartElem.addEventListener('click', function () {
        toggleElementsClassNames();
        setTimeout(function () {
            Gradient.startTransition(false);
            innerElm.classList.add('active');
        }, DEF_DELAY);
    });
};

var addBrowserSupportClasses = function addBrowserSupportClasses() {
    var HTMLElem = document.getElementsByTagName('html')[0];
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (CSS.supports('display', 'grid')) {
        HTMLElem.classList.add('css-grid');
    }
    if (CSS.supports('--fake-var', 0) || isSafari) {
        HTMLElem.classList.add('css-variables');
        Gradient.supportsCssVars = true;
    }
};

//after document has loaded
window.addEventListener('DOMContentLoaded', function () {
    addBrowserSupportClasses();
    var isFirstLoad = true;
    Gradient.startTransition(isFirstLoad);
    changRoleText();
    addEventsToHeartButton();
});
//# sourceMappingURL=scripts.js.map