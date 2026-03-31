jest.dontMock('fs');
const $ = require('jquery');
const html = require('fs').readFileSync('./index.html').toString();
const {InitScripts} = require('./scripts.js');
const {GradientGenerator} = require('./gradient-generator.js');
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM();
const { window } = jsdom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};

//global.paper = paper.setup();
global.project = {
    activeLayer: {
        removeChildren: () => {}
    }
};
global.view = {
    center: {
        x: {},
        y: {}
    }
};

copyProps(window, global);

describe('InitScripts Class ', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html;
    });

    it('should identify class as object', () => {
        const Gradient = new GradientGenerator();
        const InitScript = new InitScripts(Gradient);
        expect(typeof InitScript).toBe('object');
    });

    describe('checks static toggleElementsClassNames method', () => {

        it('should add className "active" to HTML elements', () => {
            expect($('.outer , .inner , .mood-actions').hasClass('active')).toBe(true);
            InitScripts.toggleElementsClassNames();
            expect($('.outer , .inner , .heart').hasClass('active')).toBe(false);
        });

    });

    describe('checks static pickRandomRole method', () => {

        it('should return one role from the list of roles', () => {
            const InitScript = new InitScripts({});
            let roles = InitScript.roles;
            let role = InitScripts.pickRandomRole(roles);
            expect(roles.includes(role)).toBe(true);
        });

    });

    describe('checks "startInitialTransition" method', () => {

        it('should call "startTransition" on Gradient', () => {
            const Gradient = new GradientGenerator();
            const InitScript = new InitScripts(Gradient);
            let fn = jest.spyOn(Gradient, 'startTransition');
            InitScript.startInitialTransition(true);
            expect(fn).toHaveBeenCalled();
        });

    });

    describe('checks changRoleText method', () => {

        const Gradient = new GradientGenerator();
        const InitScript = new InitScripts(Gradient);

        it('should add a role text to a roleElement that exists in an array', () => {
            const roles = InitScript.roles;
            InitScript.changRoleText();
            const role = $('.role').text().slice(0, -1);
            expect(roles.includes(role)).toBe(true);
        });

        it('should add a dot at the end of the added string', () => {
            InitScript.changRoleText();
            let text = $('.role').text().toString();
            const last = text.charAt(text.length - 1);
            expect(last).toBe('.');
        });

        it('should clear html element "data-text" attribute', () => {
            InitScript.changRoleText();
            let element = $('.role');
            expect(element.attr('data-text')).toBe(' ');
        });

        jest.useFakeTimers();
        it('should clear clearInterval', () => {
            InitScript.changRoleText();
            expect(setInterval.mock.calls.length > 0).toBe(true);
        });

    });

    describe('checks addEventsToHeartButton method', () => {

        const Gradient = new GradientGenerator();
        const InitScript = new InitScripts(Gradient);

        jest.useFakeTimers();

        it('should call "toggleElementsClassNames" after click on html heart element', () => {
            InitScript.addEventsToHeartButton();
            let fn = jest.spyOn(InitScripts, 'toggleElementsClassNames');
            $('.heart').click();
            expect(fn).toHaveBeenCalledTimes(1)
        });

        it('should execute "startTransition" after delay', () => {
            InitScript.addEventsToHeartButton();
            let fn = jest.spyOn(Gradient, 'startTransition');
            $('.heart').click();
            expect(setTimeout).toHaveBeenCalled();
            jest.runOnlyPendingTimers();
            expect(fn).toHaveBeenCalled()
        });

        it('should execute "startTransition" after delay', () => {
            InitScript.addEventsToHeartButton();
            $('.heart').click();
            expect(setTimeout).toHaveBeenCalled();
            jest.runOnlyPendingTimers();
            expect($('.inner').hasClass('active')).toBe(true);
        });
    });

    describe('checks "addBrowserSupportClasses" method', () => {

        const Gradient = new GradientGenerator();
        const InitScript = new InitScripts(Gradient);

        it('should add cssClassName "css-grid" to html', () => {

            global['CSS'] = {
                supports: (a,b) => a === 'display' && b === 'grid'
            };

            InitScript.addBrowserSupportClasses();
            expect($('html').hasClass('css-grid')).toBe(true);
        });

        it('should add cssClassName "css-variables" to html', () => {

            global['CSS'] = {
                supports: (a,b) => a === '--fake-var' && b === 0
            };

            InitScript.addBrowserSupportClasses();
            expect($('html').hasClass('css-variables')).toBe(true);
        });

    });

    describe('checks static "getRelevantCoordinates" method', () => {

        it('should return dataset relevant to "behance" className',() => {
            const getData = InitScripts.getRelevantCoordinates('behance');
            expect(getData.name).toEqual('behance');
        });

        it('should return dataset relevant to "email" className',() => {
            const getData = InitScripts.getRelevantCoordinates('email');
            expect(getData.name).toEqual('email');
        });

        it('should return dataset relevant to "github" className',() => {
            const getData = InitScripts.getRelevantCoordinates('github');
            expect(getData.name).toEqual('github');
        });

        it('should return dataset relevant to "heart" className',() => {
            const getData = InitScripts.getRelevantCoordinates('heart');
            expect(getData.name).toEqual('heart');
        })

    });

    describe('checks eventForMouseLeave method', () => {

        const Gradient = new GradientGenerator();
        const InitScript = new InitScripts(Gradient);

        it('should set string to Tap', () => {
            InitScript.isTouchDevice = true;
            InitScript.eventForMouseLeave();
            expect($('#tooltip-text')[0].innerText.split(' ')[0]).toBe('Tap');
        });

        it('should set string to Click', () => {
            InitScript.isTouchDevice = false;
            InitScript.eventForMouseLeave();
            expect($('#tooltip-text')[0].innerText.split(' ')[0]).toBe('Click');
        });

    });

    describe('checks static applyNavHoverForClassName method', () => {

        it('should set github tooltip and panel paths', () => {
            InitScripts.applyNavHoverForClassName('github');
            expect(document.getElementById('tooltip-text').textContent.trim()).toBe(
                'Follow me on Github !'
            );
            expect(document.getElementsByClassName('line-up')[0].getAttribute('d')).toContain('83.5');
        });

        it('should set email tooltip', () => {
            InitScripts.applyNavHoverForClassName('email');
            expect(document.getElementById('tooltip-text').textContent.trim()).toBe('Email me !');
        });
    });

    describe('checks toggleTooltipClassNamesOnHover method', () => {

        it('should register mouseleave on navigation', () => {
            const Gradient = new GradientGenerator();
            const InitScript = new InitScripts(Gradient);
            const nav = document.querySelector('.navigation');
            const spy = jest.spyOn(nav, 'addEventListener');
            InitScript.toggleTooltipClassNamesOnHover();
            expect(spy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
            spy.mockRestore();
        });

        it('should register mouseenter handlers that call applyNavHoverForClassName', () => {
            const Gradient = new GradientGenerator();
            const InitScript = new InitScripts(Gradient);
            const applySpy = jest.spyOn(InitScripts, 'applyNavHoverForClassName');
            const addSpy = jest.spyOn(HTMLElement.prototype, 'addEventListener');
            InitScript.toggleTooltipClassNamesOnHover();
            const mouseenterListeners = addSpy.mock.calls.filter((call) => call[0] === 'mouseenter');
            expect(mouseenterListeners.length).toBe(3);
            mouseenterListeners.forEach(([, handler]) => handler());
            expect(applySpy).toHaveBeenCalledTimes(3);
            addSpy.mockRestore();
            applySpy.mockRestore();
        });

        it('should reset tooltip on navigation mouseleave', () => {
            const Gradient = new GradientGenerator();
            const InitScript = new InitScripts(Gradient);
            InitScript.toggleTooltipClassNamesOnHover();
            const nav = document.querySelector('.navigation');
            const win = nav.ownerDocument.defaultView;
            nav.dispatchEvent(new win.MouseEvent('mouseleave', { bubbles: false, cancelable: true }));
            expect(document.getElementById('tooltip-text').textContent.trim()).toMatch(
                /^Click to change the mood !$/
            );
        });
    });

    describe('checks modifyTooltipOnClick method', () => {

        it('should not change tooltip when heart was not clicked yet', () => {
            const Gradient = new GradientGenerator();
            const InitScript = new InitScripts(Gradient);
            InitScript.isAlreadyClicked = false;
            const before = document.getElementById('tooltip-text').innerText;
            InitScript.modifyTooltipOnClick();
            expect(document.getElementById('tooltip-text').innerText).toBe(before);
        });
    });

});