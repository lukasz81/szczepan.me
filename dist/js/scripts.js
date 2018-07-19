'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//copyright: Lukasz Szczepanski of szczepan.me

var InitScripts = exports.InitScripts = function () {
    function InitScripts() {
        _classCallCheck(this, InitScripts);

        this.ROLE_TEXT_SWITCH = 4000;
        this.DEF_DELAY = 300;
        this.roles = ['UX Designer', 'UI Designer', 'UI Developer', 'Front End Developer', 'Designer', 'UI Engineer', 'Web Designer', 'Web Developer', 'Coder', 'Human'];

        this.Gradient = new GradientGenerator();
    }

    _createClass(InitScripts, [{
        key: 'changRoleText',
        value: function changRoleText() {
            var _this = this;

            setInterval(function () {
                var roleElem = document.querySelector('.role');
                var roles = _this.roles;
                var role = roles[Math.floor(Math.random() * roles.length)];
                var text = role + '.';
                roleElem.innerHTML = text;
                roleElem.setAttribute('data-text', ' ');

                var attributeHandler = setInterval(function () {
                    roleElem.setAttribute('data-text', text);
                    clearInterval(attributeHandler);
                    attributeHandler = false;
                }, _this.ROLE_TEXT_SWITCH * 0.75);
            }, this.ROLE_TEXT_SWITCH);
        }
    }, {
        key: 'toggleElementsClassNames',
        value: function toggleElementsClassNames() {
            var elements = '.outer , .inner , .heart';
            var elementsList = document.querySelectorAll(elements);
            var elementsArray = Array.from(elementsList);
            elementsArray.forEach(function (element) {
                element.classList.toggle('active');
            });
        }
    }, {
        key: 'addEventsToHeartButton',
        value: function addEventsToHeartButton() {
            var _this2 = this;

            var heartElem = document.querySelector('.heart');
            var innerElm = document.querySelector('.inner');
            heartElem.addEventListener('click', function () {
                _this2.toggleElementsClassNames();
                setTimeout(function () {
                    _this2.Gradient.startTransition(false);
                    innerElm.classList.add('active');
                }, _this2.DEF_DELAY);
            });
        }
    }, {
        key: 'addBrowserSupportClasses',
        value: function addBrowserSupportClasses() {
            var HTMLElem = document.getElementsByTagName('html')[0];
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (CSS.supports('display', 'grid')) {
                HTMLElem.classList.add('css-grid');
            }
            if (CSS.supports('--fake-var', 0) || isSafari) {
                HTMLElem.classList.add('css-variables');
                this.Gradient.supportsCssVars = true;
            }
        }
    }, {
        key: 'startTransition',
        value: function startTransition() {
            var isFirstLoad = true;
            this.Gradient.startTransition(isFirstLoad);
        }
    }]);

    return InitScripts;
}();
//# sourceMappingURL=scripts.js.map