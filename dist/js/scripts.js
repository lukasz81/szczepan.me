'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitScripts = exports.InitScripts = function () {
    function InitScripts(Gradient) {
        var _this = this;

        _classCallCheck(this, InitScripts);

        this.ROLE_TEXT_SWITCH = 4000;
        this.DEF_DELAY = 300;
        this.roles = ['UX Designer', 'UI Designer', 'UI Developer', 'Front End Developer', 'Designer', 'UI Engineer', 'Web Designer', 'Web Developer', 'Coder', 'Human'];
        this.Gradient = Gradient;
        this.isTouchDevice = "ontouchstart" in document.documentElement;
        this.isAlreadyClicked = false;
        this.eventForMouseLeave = this.eventForMouseLeave.bind(this);
        (function () {
            if (_this.isTouchDevice) document.getElementById('action-type').innerText = 'Tap ';
        })();
    }

    _createClass(InitScripts, [{
        key: 'changRoleText',
        value: function changRoleText() {
            var _this2 = this;

            setInterval(function () {
                var roleElem = document.querySelector('.role');
                var roles = _this2.roles;
                var role = InitScripts.pickRandomRole(roles);
                var text = role + '.';
                roleElem.innerHTML = text;
                roleElem.setAttribute('data-text', ' ');

                var attributeHandler = setInterval(function () {
                    roleElem.setAttribute('data-text', text);
                    clearInterval(attributeHandler);
                    attributeHandler = false;
                }, _this2.ROLE_TEXT_SWITCH * 0.3);
            }, this.ROLE_TEXT_SWITCH);
        }
    }, {
        key: 'addEventsToHeartButton',
        value: function addEventsToHeartButton() {
            var _this3 = this;

            var heartElem = document.querySelector('.heart');
            var innerElm = document.querySelector('.inner');
            heartElem.addEventListener('click', function () {
                _this3.isAlreadyClicked = true;
                InitScripts.toggleElementsClassNames();
                setTimeout(function () {
                    _this3.Gradient.startTransition(false);
                    innerElm.classList.add('active');
                    _this3.modifyTooltipOnClick();
                }, _this3.DEF_DELAY);
            });
        }
    }, {
        key: 'modifyTooltipOnClick',
        value: function modifyTooltipOnClick() {
            if (this.isAlreadyClicked) {
                document.getElementById('tooltip-text').innerText = 'Follow me on Twitter !';
                InitScripts.updateSVGDataSet(InitScripts.getRelevantCoordinates('twitter'));
            }
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
        key: 'startInitialTransition',
        value: function startInitialTransition(isOnLoad) {
            this.Gradient.startTransition(isOnLoad);
        }
    }, {
        key: 'toggleTooltipClassNamesOnHover',
        value: function toggleTooltipClassNamesOnHover() {
            var hoveredElements = document.querySelectorAll('.more');
            var navigation = document.getElementsByClassName('navigation')[0];
            hoveredElements.forEach(function (element) {
                var classListName = element.querySelector('figure').className;
                element.addEventListener('mouseenter', function () {
                    InitScripts.updateSVGDataSet(InitScripts.getRelevantCoordinates(classListName));
                    document.getElementById('tooltip-text').innerText = 'Follow me on ' + classListName.replace(/^\w/, function (chr) {
                        return chr.toUpperCase();
                    }) + ' !';
                });
            });
            navigation.addEventListener('mouseleave', this.eventForMouseLeave);
        }
    }, {
        key: 'eventForMouseLeave',
        value: function eventForMouseLeave() {
            var action = this.isTouchDevice ? 'Tap ' : 'Click ';
            document.getElementById('tooltip-text').innerText = action + ' to change the mood !';
            InitScripts.updateSVGDataSet(InitScripts.getRelevantCoordinates('heart'));
        }
    }], [{
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
        key: 'pickRandomRole',
        value: function pickRandomRole(roles) {
            return roles[Math.floor(Math.random() * roles.length)];
        }
    }, {
        key: 'updateSVGDataSet',
        value: function updateSVGDataSet(dataSet) {
            document.getElementsByClassName('line-up')[0].setAttribute('d', dataSet.lineUp); // st10
            document.getElementsByClassName('line-down')[0].setAttribute('d', dataSet.lineDown); // st1
            document.getElementsByClassName('shape')[0].setAttribute('d', dataSet.shape); // st0
        }
    }, {
        key: 'getRelevantCoordinates',
        value: function getRelevantCoordinates(classListName) {
            var dataSet1 = {
                name: 'behance',
                lineUp: "M0,12.6 137.5,12.6 150,0.6 161.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,83.4 161.8,83.4 300,83.4",
                shape: "M300,83.4 161.8,83.4 150,83.4 137.5,83.4 0,83.4 0,12.6 137.5,12.6 150,0.6 161.8,12.6 300,12.6 z"
            };
            var dataSet2 = {
                name: 'twitter',
                lineUp: "M0,12.6 192.5,12.6 205,0.6 216.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,83.4 161.8,83.4 300,83.4 ",
                shape: "M300,83.4 161.8,83.4 150,83.4 137.5,83.4 0,83.4 0,12.6 192.5,12.6 205,0.6 216.8,12.6 300,12.6 z"
            };
            var dataSet3 = {
                name: 'github',
                lineUp: "M0,12.6 83.5,12.6 96,0.6 107.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,83.4 161.8,83.4 300,83.4 ",
                shape: "M300,83.4 161.8,83.4 150,83.4 137.5,83.4 0,83.4 0,12.6 83.5,12.6 96,0.6 107.8,12.6 300,12.6 z"
            };
            var dataSet4 = {
                name: 'heart',
                lineUp: "M0,12.6 137.5,12.6 150,12.6 161.8,12.6 300,12.6 ",
                lineDown: "M0,83.4 137.5,83.4 150,95.4 161.8,83.4 300,83.4 ",
                shape: "M300,83.4 161.8,83.4 150,95.4 137.5,83.4 0,83.4 0,12.6 137.5,12.6 150,12.6 161.8,12.6 300,12.6 z"
            };
            return [dataSet1, dataSet2, dataSet3, dataSet4].find(function (set) {
                return set.name === classListName;
            });
        }
    }]);

    return InitScripts;
}();