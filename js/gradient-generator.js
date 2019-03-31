export class GradientGenerator {

    constructor() {
        this.DELAY = 10;
        this.firstGrad = true;
        this.isFirstLoad = true;
        this.supportsCssVars = false;
        this.prevColors = {
            targetColorOne: [10,10,10],
            targetColorTwo: [0,0,0]
        };
        this.midRGB = [5,5,5];
        this.transitionHandler = null;
        this.increment = null;
    }

    static getRandomRGBValue() {
        return Math.floor(Math.random() * 255)
    };

    static defineColorBrightness() {
        // based on color contrast formula: https://www.w3.org/TR/AERT/#color-contrast
        const rgb = GradientGenerator.midRGB;
        const sum = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
        // const safeColor = sum >= 128 ? '#2b2b2b' : '#d0d0d0';
        let safeColor = null;
        if (sum >= 100) {
            safeColor = '#2b2b2b';
        } else if (sum < 128 && sum > 65) {
            safeColor = '#d0d0d0';
        } else {
            safeColor = '#fefefe';
        }
        document.documentElement.style.setProperty(`--safe-color`, `${safeColor}`);
        const className = safeColor === '#2b2b2b' ? 'theme-dark':'theme-bright';
        document.documentElement.classList.remove('theme-dark', 'theme-bright');
        document.documentElement.classList.add(className);
    }

    static calculateAndUpdateMidGradientColor(gradients, p = 0.5) {
        const { rgbOne, rgbTwo } = gradients;
        const w = p * 2 - 1;
        const w1 = (w + 1) / 2.0;
        const w2 = 1 - w1;
        const midRGB = [
            Math.round(rgbOne[0] * w1 + rgbTwo[0] * w2),
            Math.round(rgbOne[1] * w1 + rgbTwo[1] * w2),
            Math.round(rgbOne[2] * w1 + rgbTwo[2] * w2),
        ];
        GradientGenerator.midRGB = midRGB;
        GradientGenerator.defineColorBrightness();
        return midRGB;
    }

    static createRandomGradient() {
        const R1 = GradientGenerator.getRandomRGBValue();
        const R2 = GradientGenerator.getRandomRGBValue();
        const G1 = GradientGenerator.getRandomRGBValue();
        const G2 = GradientGenerator.getRandomRGBValue();
        const B1 = GradientGenerator.getRandomRGBValue();
        const B2 = GradientGenerator.getRandomRGBValue();
        const gradients = {
            rgbOne: [R1, G1, B1],
            rgbTwo: [R2, G2, B2]
        };
        GradientGenerator.calculateAndUpdateMidGradientColor(gradients);
        return gradients
    };

    static checkReducedValueOfArray(array) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return array.reduce(reducer) === 0;
    }

    startTransition(isFirstLoad) {
        this.isFirstLoad = isFirstLoad;
        const randomColors = GradientGenerator.createRandomGradient();
        const targetColorOne = randomColors.rgbOne;
        const targetColorTwo = randomColors.rgbTwo;
        if (this.isFirstLoad) this.prevColors = {targetColorOne, targetColorTwo};

        this.transitionHandler = setInterval(() => {
            this.transitionGradient(this.isFirstLoad, targetColorOne, targetColorTwo);
        }, this.DELAY);

    };

    checkAndUpdateColor(currentColor,targetColor) {
        this.increment = this.isFirstLoad ? [0, 0, 0] : [1, 1, 1];
        currentColor.forEach(
            (color,index) => {
                if (currentColor[index] > targetColor[index]) {
                    currentColor[index] -= this.increment[index];
                    if (currentColor[index] <= targetColor[index]) this.increment[index] = 0;
                } else {
                    currentColor[index] += this.increment[index];
                    if (currentColor[index] >= targetColor[index]) this.increment[index] = 0;
                }
            });
    }

    transitionGradient(onLoad, targetColorOne, targetColorTwo) {

        let currentColor = this.firstGrad ? this.prevColors.targetColorOne : this.prevColors.targetColorTwo;
        let targetColor = this.firstGrad ? targetColorOne : targetColorTwo;

        this.checkAndUpdateColor(currentColor,targetColor);

        const stopOne = `rgb(${this.prevColors.targetColorOne[0]} , ${this.prevColors.targetColorOne[1]} , ${this.prevColors.targetColorOne[2]})`;
        const stopTwo = `rgb(${this.prevColors.targetColorTwo[0]} , ${this.prevColors.targetColorTwo[1]} , ${this.prevColors.targetColorTwo[2]})`;

        this.applyChange(stopOne, stopTwo);

        let incrementTotalValueIsZero = GradientGenerator.checkReducedValueOfArray(this.increment);

        if (incrementTotalValueIsZero) {
            this.checkAndUpdateColor(currentColor,targetColor);
            this.reloadStyleTags(stopOne, stopTwo);
            document.querySelector('.mood-actions').classList.add('active');
            clearInterval(this.transitionHandler);
            this.applyCanvasGradient(stopOne,stopTwo,true)
        }

    };

    //apply styles to head
    reloadStyleTags(stopOne, stopTwo) {
        const styleElem = document.getElementById('tags');
        if (styleElem) styleElem.parentNode.removeChild(styleElem);
        const styleContent = `.glitch:before{ text-shadow:2px 0 ${stopTwo} }\n.glitch:after{ text-shadow:2px 0 ${stopOne} }`;
        const styleSheet = document.createElement('style');
        styleSheet.id = 'tags';
        styleSheet.innerHTML = styleContent;
        document.head.appendChild(styleSheet);
    };

    applyCanvasGradient(stopOne,stopTwo,isLast) {
        // check if it is node env. Run only if it's not until I figure out testing paper.js
        if (typeof process === 'undefined') {
            return applyGradientToCanvas(stopOne,stopTwo,isLast);
        } else {
            return 'Developer needs more time to learn testing paper.js'
        }
    }

    applyChange(stopOne, stopTwo) {
        const outerElem = document.querySelector('.outer');
        outerElem.classList.add('active');
        this.applyCanvasGradient(stopOne, stopTwo,false);
        if (this.supportsCssVars) {
            document.documentElement.style.setProperty(`--gradient-one`, `${stopOne}`);
            document.documentElement.style.setProperty(`--gradient-two`, `${stopTwo}`);
        } else {
            outerElem.style.backgroundImage = `linear-gradient(45deg,${stopOne},${stopTwo})`;
        }
        this.firstGrad = !this.firstGrad;
    };
}



