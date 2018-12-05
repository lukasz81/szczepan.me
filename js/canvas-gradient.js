function applyGradientToCanvas (stopOne,stopTwo) {

    let stopOneAlpha = addCharToString(stopOne);
    let stopTwoAlpha = addCharToString(stopTwo);

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
        center: [x + 100,y - 160],
        radius: 50
    });

    circle2.fillColor = {
        gradient: {stops: [[stopTwoAlpha], [stopOneAlpha]]},
        origin: circle2.bounds.topRight,
        destination: circle2.bounds.bottomLeft
    };

    circle2.style = {
        strokeColor: stopOne,
        strokeWidth: 1,
        shadowColor: new Color(0, 0, 0, 0.5),
        shadowBlur: 100,
    };

    // zig zag path

    let zigzag = new Path({
        segments: [[x, y], [x-80, y-80], [x-140, y-20], [x-200, y-80], [x-260, y-20], [x-320, y-80]],
        strokeWidth: 25,
    });

    zigzag.style = {
        shadowColor: new Color(0, 0, 0, 0.5),
        shadowBlur: 100,
    };

    zigzag.strokeColor = {
        gradient: {stops: [[stopOne], [stopTwo]]},
        origin: zigzag.bounds.topRight,
        destination: zigzag.bounds.bottomLeft,
    };

    zigzag
        .rotate(-45,circle.bounds.center)
        .insertBelow(circle);

    let zigzagCopy = zigzag.clone();
    zigzagCopy.strokeColor = stopTwo;
    zigzagCopy.strokeWidth = 27;
    zigzagCopy.insertBelow(zigzag);
    zigzagCopy.style = {
        shadowColor: new Color(0, 0, 0, 0),
        shadowBlur: 0
    };

    // line path

    let from = [x,y];
    let to = [x+350,y-350];
    let path = new Path(from, to);
    path.strokeWidth = 2;
    path.strokeColor = stopOne;
    path.dashArray = [5,8];
    path.insertBelow(circle);

    window.addEventListener('resize', () => {
        let x = view.center.x;
        let y = view.center.y;
        onResize(x,y);
    });

    // view.onFrame = function(event) {
    //     square.rotate(1);
    // };

    function onResize(x,y) {
        console.log('B ',square.position);
        circle.position = view.center;
        triangle.position = new Point(x - 100, y - 100);
        square.position = new Point(x + 50, y - 50)
    }

}

function addCharToString (string) {
    let str = string.substring(0,string.length-1);
    let alpha = ' , 0.7';
    return str.padEnd(str.length + alpha.length,alpha) + ')';
}
