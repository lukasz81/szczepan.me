'use strict';

var n = 0;
function applyGradientToCanvas(stopOne, stopTwo, isLast) {

    var blobExists = !!project.activeLayer.children[0];
    if (blobExists && n < 2) project.activeLayer.removeChildren();
    if (isLast) n = 0;
    var mousePos = {
        x: 0,
        y: 0
    };
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
    ++n;

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

    window.addEventListener('resize', function () {
        onResize();
    });

    function onResize() {
        blob.position = view.center;
    }

    view.onFrame = function (event) {
        var halfWidth = view.size.width / 2;
        var halfHeight = view.size.height / 2;
        var rotaionValue = 0.03;
        var direction = mousePos.x > halfWidth ? 0 - rotaionValue : rotaionValue;
        blob.rotate(direction);
        blob.position.x = halfWidth + (halfWidth - mousePos.x) / 100;
        blob.position.y = halfHeight + (halfHeight - mousePos.y) / 100;
        var amount = blob.segments.length;
        for (var i = 0; i < amount; i++) {
            var sinusY = Math.sin(event.time + i);
            var sinusX = Math.sin(event.time + i);
            blob.segments[i].point.y += sinusY / 10;
            blob.segments[i].point.x += sinusX / 5;
        }
        blob.smooth();
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