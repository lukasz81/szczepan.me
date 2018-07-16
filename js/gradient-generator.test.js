//jest.dontMock('fs');
const html = require('fs').readFileSync('./index.html').toString();
const {GradientGenerator} = require('./gradient-generator.js');

describe('Gradient Generator', () => {

    document.documentElement.innerHTML = html;

    it('should identify class as object A',() => {
        const gradientGenerator = new GradientGenerator();
        expect(typeof gradientGenerator).toBe('object')
    });

    it('should add object with colorArrayOne to "prevColors" in constructor', () => {
        const gradientGenerator = new GradientGenerator();
        gradientGenerator.addRandomGradientColorOnLoad();
        console.log('B ', gradientGenerator);
        expect('colorArrayOne' in gradientGenerator.prevColors).toBe(true);
    });

    it('should add object with colorArrayTwo to "prevColors" in constructor', () => {
        const gradientGenerator = new GradientGenerator();
        gradientGenerator.addRandomGradientColorOnLoad();
        console.log('B ', gradientGenerator);
        expect('colorArrayTwo' in gradientGenerator.prevColors).toBe(true);
    })

});


