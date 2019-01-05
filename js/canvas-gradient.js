let n = 0;
function applyGradientToCanvas (stopOne,stopTwo, isLast) {

    let alpha;
    let gammaX = view.size.width / 2;
    let betaY = view.size.height / 2;
    let mousePos = {
        x: view.size.width / 2,
        y: view.size.height / 2
    };
    let gyroEvents = null;
    const blobExists = !!project.activeLayer.children[0];
    if (blobExists && n < 2) project.activeLayer.removeChildren();
    const stopOneAlpha = addCharToString(stopOne);
    const stopTwoAlpha = addCharToString(stopTwo);
    const center = view.center;
    const points = function getRandomInt(min = 3, max = 15) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    const radius = view.size.width <= 375 ? (view.size.width - 150) : 250;
    createBlob(center, radius, points());
    const blob = project.activeLayer.children[0];
    window.addEventListener("deviceorientation", handleOrientation, {passive: true});
    isLast ? n=0 : ++n;

    function handleOrientation(event) {
        gyroEvents = true;
        alpha = event.alpha;
        betaY = event.beta;
        gammaX = event.gamma;
        // document.getElementById('rotation').innerText =
        //     Math.round(alpha) + ' ' +
        //     Math.round(betaY) + ' ' +
        //     Math.round(gammaX);
    }

    if (gyroEvents) {
        let text = new PointText(10,10);
        text.content = `gamma: ${Math.round(gammaX)}`;
        text.justification = 'center';
        text.fillColor = 'black';
        text.fontFamily = 'Courier New';
    }

    function createBlob(center, maxRadius, points) {
        let path = new Path();
        path.closed = true;
        for (let i = 0; i < points; i++) {
            let delta = new Point({
                length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
                angle: (360 / points) * i
            });
            path.add(delta);
        }
        path.smooth();
        return path;
    }

    /// blob
    blob.position = center;
    blob.style = {
        strokeColor: stopOne,
        strokeWidth: 1,
        shadowColor: new Color(0, 0, 0, 0.5),
        shadowBlur: 100,
    };
    blob.fillColor = {
        gradient: {stops: [[stopOneAlpha], [stopTwoAlpha]]},
        origin: blob.bounds.topRight,
        destination: blob.bounds.bottomLeft
    };

    view.onFrame = function(event) {
        const halfWidth = view.size.width / 2;
        const halfHeight = view.size.height / 2;
        const rotationValue = 0.03;
        const direction = mousePos.x > halfWidth ? 0 - rotationValue : rotationValue;
        const directionGyro = 180 > alpha < 360 ? 0 - rotationValue : rotationValue;
        const destX = (halfWidth + (halfWidth - mousePos.x)/10) - blob.position.x;
        const destY = (halfHeight + (halfHeight - mousePos.y)/10) - blob.position.y;
        const X = (halfWidth + (halfWidth - gammaX*10)/10) - blob.position.x;
        const Y = (halfWidth + (halfWidth - (betaY-90)*20)/10) - blob.position.y;
        blob.rotate(gyroEvents ? directionGyro : direction);
        blob.position.x += gyroEvents ? X/100 : destX/100;
        blob.position.y += gyroEvents ? Y/100 : destY/100;
        for (let i = 0; i < blob.segments.length; i++) {
            let sinusY = Math.sin(event.time + i);
            let sinusX = Math.sin(event.time + i);
            blob.segments[i].point.y += sinusY/10;
            blob.segments[i].point.x += sinusX/5;
        }
        blob.smooth();
        if (gyroEvents) {
            text.position.x = halfWidth - gammaX;
            text.content = `gamma: ${Math.round(gammaX)}`;
        }
    };
    view.onMouseMove = function(event) {
        return mousePos = event.point;
    }
}

// helper function to add alpha transparency to gradient
function addCharToString (string) {
    let str = string.substring(0,string.length-1);
    let alpha = ' , 1';
    return str.padEnd(str.length + alpha.length,alpha) + ')';
}
