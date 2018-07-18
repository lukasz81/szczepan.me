export class GradientGenerator {

    constructor() {
        this.DELAY = 10;
        this.firstGrad = true;
        this.isFirstLoad = true;
        this.supportsCssVars = false;
        this.prevColors = {};
        this.testN = 0;
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

    startTransition(isFirstLoad) {
        this.isFirstLoad = isFirstLoad;
        console.log('isFirstLoad: ',this.isFirstLoad);
        const targetColorOne = GradientGenerator.createRandomGradient().rgbOne;
        const targetColorTwo = GradientGenerator.createRandomGradient().rgbTwo;
        if (this.isFirstLoad) this.prevColors = {targetColorOne, targetColorTwo};

        window.transitionHandler = setInterval( () => {
            this.transitionGradient(this.isFirstLoad, targetColorOne, targetColorTwo);
        }, this.DELAY);

    };
    transitionGradient(onLoad, targetColorOne, targetColorTwo) {
        console.log('ARGS',...arguments);
        this.testN++;
        let currentColor = this.firstGrad ? this.prevColors.targetColorOne : this.prevColors.targetColorTwo;
        let targetColor = this.firstGrad ? targetColorOne : targetColorTwo;
        let increment = onLoad ? [0, 0, 0] : [1, 1, 1];

        console.log('currentColor: ',currentColor);
        console.log('this.prevColors: ',this.prevColors);

        // checking G
        if (currentColor[0] > targetColor[0]) {
            currentColor[0] -= increment[0];
            if (currentColor[0] <= targetColor[0]) {
                increment[0] = 0;
            }
        } else {
            currentColor[0] += increment[0];
            if (currentColor[0] >= targetColor[0]) {
                increment[0] = 0;
            }
        }
        // checking G
        if (currentColor[1] > targetColor[1]) {
            currentColor[1] -= increment[1];
            if (currentColor[1] <= targetColor[1]) {
                increment[1] = 0;
            }
        } else {
            currentColor[1] += increment[1];
            if (currentColor[1] >= targetColor[1]) {
                increment[1] = 0;
            }
        }
        // checking B
        if (currentColor[2] > targetColor[2]) {
            currentColor[2] -= increment[2];
            if (currentColor[2] <= targetColor[2]) {
                increment[2] = 0;
            }
        } else {
            currentColor[2] += increment[2];
            if (currentColor[2] >= targetColor[2]) {
                increment[2] = 0;
            }
        }

        const stopOne = `rgb(${this.prevColors.targetColorOne[0]} , ${this.prevColors.targetColorOne[1]} , ${this.prevColors.targetColorOne[2]})`;
        const stopTwo = `rgb(${this.prevColors.targetColorTwo[0]} , ${this.prevColors.targetColorTwo[1]} , ${this.prevColors.targetColorTwo[2]})`;

        this.applyChange(stopOne, stopTwo);

        if (increment[0] === 0 && increment[1] === 0 && increment[2] === 0) {
            this.reloadStyleTags(stopOne, stopTwo);
            document.querySelector('.heart').classList.add('active');
            clearInterval(window.transitionHandler);
        }

        console.log('<= HOLA =>', this.testN);
    };

    //apply styles to head
    reloadStyleTags(stopOne, stopTwo) {
        const styleElem = document.getElementById('tags');
        if (styleElem) styleElem.parentNode.removeChild(styleElem);
        const styleContent = `.comingSoon .glitch:before{ text-shadow:2px 0 ${stopTwo} }\n.comingSoon .glitch:after{ text-shadow:2px 0 ${stopOne} }`;
        const styleSheet = document.createElement('style');
        styleSheet.id = 'tags';
        styleSheet.innerHTML = styleContent;
        document.head.appendChild(styleSheet);
    };

    applyChange(stopOne, stopTwo) {

        const outerElem = document.querySelector('.outer');

        if (this.supportsCssVars) {
            document.documentElement.style.setProperty(`--gradient-one`, `${stopOne}`);
            document.documentElement.style.setProperty(`--gradient-two`, `${stopTwo}`);
        } else {
            outerElem.style.backgroundImage = `linear-gradient(45deg,${stopOne},${stopTwo})`;
        };

        outerElem.classList.add('active');
        this.firstGrad = !this.firstGrad;

    };


    // testLoop() {
    //
    //     const differenceOfTheGradientColors = () => ({
    //         'differenceRed': firstGrad ? (targetColorOne[0] - colorArrayOne[0]) : (targetColorTwo[0] - colorArrayTwo[0]),
    //         'differenceGreen': firstGrad ? (targetColorOne[1] - colorArrayOne[1]) : (targetColorTwo[1] - colorArrayTwo[1]),
    //         'differenceBlue': firstGrad ? (targetColorOne[2] - colorArrayOne[2]) : (targetColorTwo[2] - colorArrayTwo[2])
    //     });
    //
    //     const DIFF = differenceOfTheGradientColors();
    //     const DELAY = 100;
    //     const RED = {
    //         'sign': DIFF.differenceRed > 0 ? '+' : '-',
    //         'value': Array.from(Array(Math.abs(DIFF.differenceRed)).keys())
    //     };
    //     // const GREEN = Array.from(Array(DIFF.differenceGreen).keys());
    //     // const BLUE = Array.from(Array(DIFF.differenceBlue).keys());
    //
    //     for (let value of RED.value) {
    //         RED.sign === '+' ? value++ : value--;
    //         setTimeout(() => {
    //             console.log('R: ', value, ' firstGrad: ', firstGrad, ' differenceOfTheGradientColors: ', RED);
    //         }, DELAY * value);
    //     }
    //
    // };
}



