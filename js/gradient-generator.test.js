jest.dontMock('fs');
const $ = require('jquery');
const html = require('fs').readFileSync('./index.html').toString();
const {GradientGenerator} = require('./gradient-generator.js');

describe('Gradient Generator Class ', () => {

    beforeEach( () => {
        document.documentElement.innerHTML = html;
    });

    it('should identify class as object', () => {
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

        it('should contain and array of random R,G,B values in "rgbOne"', () => {
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

        it('should call "transitionGradient"', done => {

            const gradientGenerator = new GradientGenerator();
            gradientGenerator.startTransition(true);
            let fn = jest.spyOn(gradientGenerator, 'transitionGradient');

            setTimeout( () => {
                expect(fn).toHaveBeenCalled();
                done();
            }, 10)
        });

        it('should set "isFirstLoad" in constructor to false', () => {
            const gradientGenerator = new GradientGenerator();
            const expectedValue = false;
            gradientGenerator.startTransition(expectedValue);
            expect(gradientGenerator.isFirstLoad).toBe(expectedValue);
        });

    });

    describe('checks "transitionGradient" method', () => {

        it('should call "applyChange" once only if it is pageLoad', () => {
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            let fn = jest.spyOn(gradientGenerator, 'applyChange');
            gradientGenerator.transitionGradient(isPageLoad,[0,0,0],[0,0,0]);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should call "reloadStyleTags" when "transitionGradient" is called with onPageLoad equal to true', () => {
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            let fn = jest.spyOn(gradientGenerator, 'reloadStyleTags');
            gradientGenerator.transitionGradient(isPageLoad,[10,10,10],[10,10,10]);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should add a class name="active" to html element', () => {
            let isPageLoad = true;
            const gradientGenerator = new GradientGenerator();
            gradientGenerator.transitionGradient(isPageLoad,[10,10,10],[10,10,10]);
            expect($('.heart').hasClass('active')).toBe(true);
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

});


