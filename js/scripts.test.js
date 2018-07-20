jest.dontMock('fs');
const $ = require('jquery');
const html = require('fs').readFileSync('./index.html').toString();
const {InitScripts} = require('./scripts.js');
const {GradientGenerator} = require('./gradient-generator.js');

describe('Gradient Generator Class ', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html;
    });

    it('should identify class as object', () => {
        const Gradient = new GradientGenerator();
        const initScript = new InitScripts(Gradient);
        expect(typeof initScript).toBe('object');
    });

});