jest.dontMock('fs');
const $ = require('jquery');
const html = require('fs').readFileSync('./index.html').toString();

describe('Gradient Generator Class ', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html;
    });

    it('should recognise global window in node env', () => {
        expect(typeof global.window).toBe('object');
    });

    it('should recognise global window in node env', () => {
        $('.heart').click();
    });
});