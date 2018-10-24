export class GradientGenerator {

    constructor() {
        this.DELAY = 10;
        this.firstGrad = true;
        this.isFirstLoad = true;
        this.supportsCssVars = false;
        this.prevColors = {
            targetColorOne:[10,10,10],
            targetColorTwo:[0,0,0]
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

        this.transitionHandler = setInterval( () => {
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
            this.reloadStyleTags(stopOne, stopTwo);
            document.querySelector('.heart').classList.add('active');
            clearInterval(this.transitionHandler);
        }

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
    
    addCharToString(string){
        let str = string.substring(0,string.length-1);
        let strLength = str.length;
        let alpha = ' , 0.7';
        let alphaLength = alpha.length;
        return str.padEnd(strLength+alphaLength,alpha) + ')';
    }

    applyCanvasGradient(stopOne,stopTwo) {

        let stopOneAlpha = this.addCharToString(stopOne);
        let stopTwoAlpha = this.addCharToString(stopTwo);

        project.activeLayer.removeChildren();

        let x = view.center.x;
        let y = view.center.y;

        ///triangle
        let triangle = new Path.RegularPolygon(new Point(x - 100, y - 100), 3, 150);

        triangle.fillColor = {
            gradient: {stops: [[stopTwo], [stopOne]]},
            origin: triangle.bounds.topRight,
            destination: triangle.bounds.bottomLeft,
        };

        triangle.style = {
            strokeColor: stopTwo,
            strokeWidth: 1,
            shadowColor: new Color(0, 0, 0, 0.5),
            shadowBlur: 100,
        };

        ///square

        let square = new Path.Rectangle({
            point: [x+50, y-150],
            size: [200, 200]
        });

        square.style = {
            strokeColor: stopTwo,
            strokeWidth: 1,
            shadowColor: new Color(0, 0, 0, 0.5),
            shadowBlur: 100
        };

        square.fillColor = {
            gradient: {stops: [[stopTwo], [stopOne]]},
            origin: square.bounds.topRight,
            destination: square.bounds.bottomLeft
        };

        /// circles

        let circle = new Path.Circle({
            center: view.center,
            radius: 150,
        });

        circle.fillColor = {
            gradient: {stops: [[stopOneAlpha], [stopTwoAlpha]]},
            origin: circle.bounds.topRight,
            destination: circle.bounds.bottomLeft
        };

        circle.style = {
            strokeColor: stopOne,
            strokeWidth: 1,
            shadowColor: new Color(0, 0, 0, 0.5),
            shadowBlur: 100,
        };


        let circle2 = new Path.Circle({
            center: [view.center.x + 100,view.center.y - 160],
            radius: 50,
            opacity: 0.8
        });

        circle2.fillColor = {
            gradient: {stops: [[stopTwo], [stopOne]]},
            origin: circle2.bounds.topRight,
            destination: circle2.bounds.bottomLeft
        };

        circle2.style = {
            strokeColor: stopOne,
            strokeWidth: 1,
            shadowColor: new Color(0, 0, 0, 0.5),
            shadowBlur: 10,
        };

        //circle2.selected = true;
        // circle2.opacity = 0.5

        window.addEventListener('resize', () => {
            let x = view.center.x;
            let y = view.center.y;
            onResize(x,y);
        });

        function onResize(x,y) {
            console.log('B ',square.position);
            circle.position = view.center;
            triangle.position = new Point(x - 100, y - 100);
            square.position = new Point(x + 50, y - 50)
        }

    }

    applyChange(stopOne, stopTwo) {
        const outerElem = document.querySelector('.outer');
        outerElem.classList.add('active');
        if (this.supportsCssVars) {
            document.documentElement.style.setProperty(`--gradient-one`, `${stopOne}`);
            document.documentElement.style.setProperty(`--gradient-two`, `${stopTwo}`);
        } else {
            outerElem.style.backgroundImage = `linear-gradient(45deg,${stopOne},${stopTwo})`;
        }
        this.firstGrad = !this.firstGrad;
        this.applyCanvasGradient(stopOne,stopTwo);
    };
}



