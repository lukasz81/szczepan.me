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
        this.transitionHandler = null;
        this.increment = null;
    }

    static getRandomRGBValue() {
        return Math.floor(Math.random() * 255)
    };

    static createRandomGradient() {
        return {
            rgbOne: [GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue()],
            rgbTwo: [GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue(), GradientGenerator.getRandomRGBValue()]
        }
    };

    static checkReducedValueOfArray(array) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return array.reduce(reducer) === 0;
    }

    startTransition(isFirstLoad) {
        this.isFirstLoad = isFirstLoad;
        const targetColorOne = GradientGenerator.createRandomGradient().rgbOne;
        const targetColorTwo = GradientGenerator.createRandomGradient().rgbTwo;
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



