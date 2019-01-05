'use strict';

var n = 0;
function applyGradientToCanvas(stopOne, stopTwo, isLast) {

    var alpha = void 0;
    var gammaX = view.size.width / 2;
    var betaY = view.size.height / 2;
    var mousePos = {
        x: view.size.width / 2,
        y: view.size.height / 2
    };
    var gyroEvents = null;
    var blobExists = !!project.activeLayer.children[0];
    if (blobExists && n < 2) project.activeLayer.removeChildren();
    var stopOneAlpha = addCharToString(stopOne);
    var stopTwoAlpha = addCharToString(stopTwo);
    var center = view.center;
    var points = function getRandomInt() {
        var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
        var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    var radius = view.size.width <= 375 ? view.size.width - 150 : 250;
    createBlob(center, radius, points());
    var blob = project.activeLayer.children[0];
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    isLast ? n = 0 : ++n;

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
        var _text = new PointText(10, 10);
        _text.content = 'gamma: ' + Math.round(gammaX);
        _text.justification = 'center';
        _text.fillColor = 'black';
        _text.fontFamily = 'Courier New';
    }

    function createBlob(center, maxRadius, points) {
        var path = new Path();
        path.closed = true;
        for (var i = 0; i < points; i++) {
            var delta = new Point({
                length: maxRadius * 0.5 + Math.random() * maxRadius * 0.5,
                angle: 360 / points * i
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
        shadowBlur: 100
    };
    blob.fillColor = {
        gradient: { stops: [[stopOneAlpha], [stopTwoAlpha]] },
        origin: blob.bounds.topRight,
        destination: blob.bounds.bottomLeft
    };

    view.onFrame = function (event) {
        var halfWidth = view.size.width / 2;
        var halfHeight = view.size.height / 2;
        var rotationValue = 0.03;
        var direction = mousePos.x > halfWidth ? 0 - rotationValue : rotationValue;
        var directionGyro = 180 > alpha < 360 ? 0 - rotationValue : rotationValue;
        var destX = halfWidth + (halfWidth - mousePos.x) / 10 - blob.position.x;
        var destY = halfHeight + (halfHeight - mousePos.y) / 10 - blob.position.y;
        var X = halfWidth + (halfWidth - gammaX * 10) / 10 - blob.position.x;
        var Y = halfWidth + (halfWidth - (betaY - 90) * 20) / 10 - blob.position.y;
        blob.rotate(gyroEvents ? directionGyro : direction);
        blob.position.x += gyroEvents ? X / 100 : destX / 100;
        blob.position.y += gyroEvents ? Y / 100 : destY / 100;
        for (var i = 0; i < blob.segments.length; i++) {
            var sinusY = Math.sin(event.time + i);
            var sinusX = Math.sin(event.time + i);
            blob.segments[i].point.y += sinusY / 10;
            blob.segments[i].point.x += sinusX / 5;
        }
        blob.smooth();
        if (gyroEvents) {
            text.position.x = halfWidth - gammaX;
            text.content = 'gamma: ' + Math.round(gammaX);
        }
    };
    view.onMouseMove = function (event) {
        return mousePos = event.point;
    };
}

// helper function to add alpha transparency to gradient
function addCharToString(string) {
    var str = string.substring(0, string.length - 1);
    var alpha = ' , 1';
    return str.padEnd(str.length + alpha.length, alpha) + ')';
}