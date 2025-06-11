let gradientCallCount = 0;

function applyGradientToCanvas(stopOne, stopTwo, isLast) {
    let alpha;
    let gyroActive = false;
    let gammaX = view.size.width / 2;
    let betaY = view.size.height / 2;
    let mousePos = { x: view.size.width / 2, y: view.size.height / 2 };
    const blobExists = !!project.activeLayer.children[0];
    if (blobExists && gradientCallCount < 2) project.activeLayer.removeChildren();
    const stopOneAlpha = addAlphaToColor(stopOne);
    const stopTwoAlpha = addAlphaToColor(stopTwo);
    const center = view.center;
    const radius = view.size.width <= 375 ? (view.size.width - 150) : 250;
    const points = getRandomInt(3, 15);
    const blob = createBlob(radius, points);
    blob.position = center;
    blob.style = {
        strokeColor: stopOne,
        strokeWidth: 1,
        shadowColor: new Color(0, 0, 0, 0.5),
        shadowBlur: 100,
    };
    blob.fillColor = {
        gradient: { stops: [[stopOneAlpha], [stopTwoAlpha]] },
        origin: blob.bounds.topRight,
        destination: blob.bounds.bottomLeft
    };
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    isLast ? gradientCallCount = 0 : ++gradientCallCount;

    function handleOrientation(event) {
        gyroActive = navigator.userAgentData && navigator.userAgentData.mobile;
        alpha = event.alpha;
        betaY = event.beta;
        gammaX = event.gamma;
    }

    view.onFrame = function (event) {
        const halfWidth = view.size.width / 2;
        const halfHeight = view.size.height / 2;
        const rotationValue = 0.03;
        const direction = mousePos.x > halfWidth ? -rotationValue : rotationValue;
        const directionGyro = (alpha > 180 && alpha < 360) ? -rotationValue : rotationValue;
        const destX = (halfWidth + (halfWidth - mousePos.x) / 10) - blob.position.x;
        const destY = (halfHeight + (halfHeight - mousePos.y) / 10) - blob.position.y;
        const gyroX = (halfWidth + (halfWidth - gammaX * 10) / 10) - blob.position.x;
        const gyroY = (halfWidth + (halfWidth - (betaY - 90) * 20) / 10) - blob.position.y;
        blob.rotate(gyroActive ? directionGyro : direction);
        blob.position.x += gyroActive ? gyroX / 100 : destX / 100;
        blob.position.y += gyroActive ? gyroY / 100 : destY / 100;
        for (let i = 0; i < blob.segments.length; i++) {
            const sinusY = Math.sin(event.time + i);
            const sinusX = Math.sin(event.time + i);
            blob.segments[i].point.y += sinusY / 10;
            blob.segments[i].point.x += sinusX / 5;
        }
        blob.smooth();
    };

    view.onMouseMove = function (event) {
        mousePos = event.point;
    };
}

// Helper: add alpha transparency to color string
function addAlphaToColor(color) {
    const str = color.substring(0, color.length - 1);
    const alpha = ' , 1';
    return str.padEnd(str.length + alpha.length, alpha) + ')';
}

// Helper: random integer in [min, max)
function getRandomInt(min = 3, max = 15) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Helper: create a random blob path
function createBlob(maxRadius, points) {
    const path = new Path();
    path.closed = true;
    for (let i = 0; i < points; i++) {
        const delta = new Point({
            length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
            angle: (360 / points) * i
        });
        path.add(delta);
    }
    path.smooth();
    return path;
}
