jest.dontMock('fs');
const $ = require('jquery');
const html = require('fs').readFileSync('./index.html').toString();
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
copyProps(window, global);


describe('Gradient Generator Class ', () => {

    beforeEach( () => {
        document.documentElement.innerHTML = html;
    });

    it('should identify class as object', () => {
        expect(typeof GradientGenerator).toBe('function');
        const gradientGenerator = new GradientGenerator();
        expect(typeof gradientGenerator).toBe('object')
    });

    describe('checks static getRandomRGBValue method', () => {

        it('should create random number ranging from 0 to 255 ', () => {
            let randomNumber = GradientGenerator.getRandomRGBValue();
            expect(randomNumber >= 0 && randomNumber <= 255).toBe(true)
        });

    });

    describe('checks static createRandomGradient method', () => {

        it('should create an object with "rgbOne" key', () => {
            let rgbKeys = GradientGenerator.createRandomGradient();
            expect('rgbOne' in rgbKeys).toBe(true)
        });

        it('should contain and array of random R,G,B numbers in "rgbOne"', () => {
            let rgbKeys = GradientGenerator.createRandomGradient();
            expect(typeof rgbKeys.rgbOne[0]).toBe('number');
            expect(typeof rgbKeys.rgbOne[1]).toBe('number');
            expect(typeof rgbKeys.rgbOne[2]).toBe('number');
        });

        it('should create an object with "rgbTwo" key', () => {
            let rgbKeys = GradientGenerator.createRandomGradient();
            expect('rgbTwo' in rgbKeys).toBe(true)
        });

        it('should contain and array of random R,G,B values in "rgbTwo"', () => {
            let rgbKeys = GradientGenerator.createRandomGradient();
            expect(typeof rgbKeys.rgbTwo[0]).toBe('number');
            expect(typeof rgbKeys.rgbTwo[1]).toBe('number');
            expect(typeof rgbKeys.rgbTwo[2]).toBe('number');
        });

    });

    describe('checks startTransition method', () => {

        it('should set "isFirstLoad" in constructor to true', () => {
            const gradientGenerator = new GradientGenerator();
            const expectedValue = true;
            gradientGenerator.startTransition(expectedValue);
            expect(gradientGenerator.isFirstLoad).toBe(expectedValue);
        });

        it('should call "transitionGradient"', () => {
            jest.useFakeTimers();
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.startTransition(true);
            let fn = jest.spyOn(gradientGenerator, 'transitionGradient');
            jest.runOnlyPendingTimers();
            expect(fn).toHaveBeenCalled();
            fn.mockRestore();
        });

        it('should call "createRandomGradient" to create random gradient', () => {
            let fn = jest.spyOn(GradientGenerator, 'createRandomGradient');
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.startTransition(true);
            expect(fn).toHaveBeenCalled();
            fn.mockRestore();
        });

        it('should set "transitionHandler" to value different then null', () => {
            const gradientGenerator = new GradientGenerator();
            const isFirstLoad = true;
            gradientGenerator.startTransition(isFirstLoad);
            expect(gradientGenerator.transitionHandler > 0).toBe(true);
        });

        it('should set "isFirstLoad" in constructor to false', () => {
            const gradientGenerator = new GradientGenerator();
            const expectedValue = false;
            gradientGenerator.startTransition(expectedValue);
            expect(gradientGenerator.isFirstLoad).toBe(expectedValue);
        });

    });

    describe('checks static "checkReducedValueOfArray" method', () => {

        it('should return false', () => {
            let isZero = GradientGenerator.checkReducedValueOfArray([0, 10, 10]);
            expect(isZero).toBe(false)
        });

        it('should return true', () => {
            let isZero = GradientGenerator.checkReducedValueOfArray([0, 0, 0]);
            expect(isZero).toBe(true)
        });

    });

    describe('checks "checkAndUpdateColor" method', () => {

        it('should increase value of R,G,B by the increment value when target color values are higher than current', () => {
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.isFirstLoad = false;
            const currentColor = gradientGenerator.prevColors.targetColorOne;
            const prevVal = currentColor[0];
            let targetColor = [15,15,15];
            gradientGenerator.checkAndUpdateColor(currentColor,targetColor);
            expect(currentColor[0]).toBe(prevVal + gradientGenerator.increment[0])
        });

        it('should decrease value of R,G,B by the increment value when target color values are higher than current', () => {
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.isFirstLoad = false;
            const currentColor = gradientGenerator.prevColors.targetColorOne;
            const prevVal = currentColor[0];
            let targetColor = [5,5,5];
            gradientGenerator.checkAndUpdateColor(currentColor,targetColor);
            expect(currentColor[0]).toBe(prevVal - gradientGenerator.increment[0]);
        });

        it('should set increment value to 0 when current is smaller then current', () => {
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.isFirstLoad = false;
            const currentColor = gradientGenerator.prevColors.targetColorOne;
            let targetColor = [0,0,0];
            expect(gradientGenerator.increment).toBe(null);
            gradientGenerator.checkAndUpdateColor(currentColor,targetColor);

            setTimeout(() => {expect(gradientGenerator.increment[0]).toBe(0);},300);
        });

    });

    describe('checks "transitionGradient" method', () => {

        let gradientGenerator = {prevColors:{targetColorOne:[10,10,10],targetColorTwo:[0,0,0]}};
        const stopOne = `rgb(${gradientGenerator.prevColors.targetColorOne[0]} , ${gradientGenerator.prevColors.targetColorOne[1]} , ${gradientGenerator.prevColors.targetColorOne[2]})`;
        const stopTwo = `rgb(${gradientGenerator.prevColors.targetColorTwo[0]} , ${gradientGenerator.prevColors.targetColorTwo[1]} , ${gradientGenerator.prevColors.targetColorTwo[2]})`;

        it('should call "applyChange" once only if it is pageLoad', () => {
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            let fn = jest.spyOn(gradientGenerator, 'applyChange');
            gradientGenerator.transitionGradient(isPageLoad,[10,10,10],[10,10,10]);
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(stopOne,stopTwo)
            fn.mockRestore();
        });

        it('should call "reloadStyleTags" when "transitionGradient" is called with onPageLoad equal to true', () => {
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            let fn = jest.spyOn(gradientGenerator, 'reloadStyleTags');
            gradientGenerator.transitionGradient(isPageLoad,[10,10,10],[10,10,10]);
            expect(fn).toHaveBeenCalledTimes(1);
            fn.mockRestore();
        });

        it('should add a class name="active" to html element', () => {
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.transitionGradient(isPageLoad,[10,10,10],[10,10,10]);
            expect($('.mood-actions').hasClass('active')).toBe(true);
        });

        it('should call clearInterval', () => {
            jest.useFakeTimers();
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.transitionGradient(isPageLoad,[10,10,10],[10,10,10]);
            expect(clearInterval.mock.calls.length).toBe(1);
        });

    });

    describe('checks "reloadStyleTags" method', () => {

        it('should add a style tag with id="tags" to HTML document after running "reloadStyleTags" ', () => {
            const gradientGenerator = new GradientGenerator();
            expect($('#tags').length).toBe(0);
            gradientGenerator.reloadStyleTags([10,10,10],[10,10,10]);
            expect($('#tags').length).toBe(1);
        });

    });

    describe('checks "applyCanvasGradient" method', () => {

        it('should return a string "Developer needs more time to learn testing paper.js" if process variable exists', () => {
            const gradientGenerator = new GradientGenerator();
            let fn = jest.spyOn(GradientGenerator.prototype, 'applyCanvasGradient');
            gradientGenerator.applyCanvasGradient(0,0);
            expect(fn).toHaveReturnedWith('Developer needs more time to learn testing paper.js');
            fn.mockRestore();
        });

        it('should call a function if "process" is undefined', () => {
            global.process = undefined;
            global.applyGradientToCanvas = (a,b) => {return 'test' + a + b};
            let fn = jest.spyOn(GradientGenerator.prototype, 'applyCanvasGradient');
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.applyCanvasGradient(0,0);
            expect(fn).toHaveReturnedWith('test00');
            fn.mockRestore();
        });

    });

    describe('checks "applyChange" method', () => {

        let gradientGenerator = {prevColors:{targetColorOne:[0,0,0],targetColorTwo:[0,0,0]}};
        const stopOne = `rgb(${gradientGenerator.prevColors.targetColorOne[0]} , ${gradientGenerator.prevColors.targetColorOne[1]} , ${gradientGenerator.prevColors.targetColorOne[2]})`;
        const stopTwo = `rgb(${gradientGenerator.prevColors.targetColorTwo[0]} , ${gradientGenerator.prevColors.targetColorTwo[1]} , ${gradientGenerator.prevColors.targetColorTwo[2]})`;

        it('should add a className "active" to a HTML element ', () => {
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.applyChange(stopOne,stopTwo);
            expect($('.outer').hasClass('active')).toBe(true);
        });

        // it('xxx', () => {
        //     const gradientGenerator = new GradientGenerator();
        //     gradientGenerator.supportsCssVars = true;
        //     gradientGenerator.applyChange(stopOne,stopTwo);
        //     const outer = $('.outer');
        //     let compStyles = window.getComputedStyle(outer);
        //     console.log('compStyles =>',compStyles);
        //     expect(window.document.documentElement.hasStyle('display', 'none')).toBe(true)
        // });

        // it('should add css className to outer element tag when there is no supportsCssVars', () => {
        //     const gradientGenerator = new GradientGenerator();
        //     gradientGenerator.supportsCssVars = false;
        //     gradientGenerator.applyChange(stopOne,stopTwo);
        //     expect($('.outer').hasClass('noCssVars')).toBe(true);
        // });

        it('should toggle firstGrad property', () => {
            const gradientGenerator = new GradientGenerator();
            const curentGradientValue = gradientGenerator.firstGrad;
            expect(gradientGenerator.firstGrad).toBe(curentGradientValue);
            gradientGenerator.applyChange(stopOne,stopTwo);
            expect(gradientGenerator.firstGrad).toBe(!curentGradientValue);
        });

        it('should call applyCanvasGradient property', () => {
            global.process = 'GLOBAL';
            let fn = jest.spyOn(GradientGenerator.prototype, 'applyCanvasGradient');
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.applyChange(stopOne,stopTwo);
            expect(fn).toHaveReturnedWith('Developer needs more time to learn testing paper.js');
            fn.mockRestore();
        });

    });

});


