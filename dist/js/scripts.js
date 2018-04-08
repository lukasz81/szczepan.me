'use strict';

//copyright: Lukasz Szczepanski of szczepan.me
var supportsCssVars = false;
var ROLE_TEXT_SWITCH = 6000;
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

var toggleElementsClassnames = function toggleElementsClassnames() {
    var elementsList = document.querySelectorAll('.outer , .inner , .heart');
    var elementsArray = Array.from(elementsList);
    elementsArray.forEach(function (element) {
        element.classList.toggle('active');
    });
};

//apply styles to head
var reloadStyleTags = function reloadStyleTags(stop1, stop2) {
    var styleElem = document.getElementById('tags');
    if (styleElem) styleElem.parentNode.removeChild(styleElem);
    var styleContent = '.comingSoon .glitch:before{ text-shadow:2px 0 ' + stop2 + ' }\n.comingSoon .glitch:after{ text-shadow:2px 0 ' + stop1 + ' }';
    var styleSheet = document.createElement('style');
    styleSheet.id = 'tags';
    styleSheet.innerHTML = styleContent;
    document.head.appendChild(styleSheet);
};

var addEventsToHeartButton = function addEventsToHeartButton() {
    var heartElem = document.querySelector('.heart');
    var innerElm = document.querySelector('.inner');
    heartElem.addEventListener('click', function () {
        toggleElementsClassnames();
        setTimeout(function () {
            Gradient.startTransition(false);
            innerElm.classList.add('active');
        }, DEF_DELAY);
    });
};

var addBrowserSupportClasses = function addBrowserSupportClasses() {
    var HTMLElem = document.getElementsByTagName('html')[0];
    if (CSS.supports('display', 'grid')) {
        HTMLElem.classList.add('css-grid');
    }
    if (CSS.supports('--fake-var', '0')) {
        HTMLElem.classList.add('css-variables');
        supportsCssVars = true;
    }
};

//after document has loaded
window.addEventListener('DOMContentLoaded', function () {
    var isFirstLoad = true;
    Gradient.startTransition(isFirstLoad);
    changRoleText();
    addEventsToHeartButton();
    addBrowserSupportClasses();
});
//# sourceMappingURL=scripts.js.map