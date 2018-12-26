function applyGradientToCanvas (stopOne,stopTwo) {

    project.activeLayer.removeChildren();
    const stopOneAlpha = addCharToString(stopOne);
    const stopTwoAlpha = addCharToString(stopTwo);
    let center = view.center;
    let points = function getRandomInt(min = 3, max = 15) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    let height = view.size.height / 2;
    let mousePos = {
        x: view.center.x,
        y: view.center.y
    };
    let radius = 250;

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
    const blob = createBlob(center, radius, points());
    blob.position = center;
    blob.fillColor = {
        gradient: {stops: [[stopOneAlpha], [stopTwoAlpha]]},
        origin: blob.bounds.topRight,
        destination: blob.bounds.bottomLeft
    };

    blob.style = {
        strokeColor: stopOne,
        strokeWidth: 1,
        shadowColor: new Color(0, 0, 0, 0.5),
        shadowBlur: 100,
    };

    const shapeHeight = blob.bounds._height;
    // blob.selected = true;
    
    window.addEventListener('resize', () => {
        onResize();
    });

    function onResize() {
        blob.position = view.center;
    }

    view.onFrame = function(event) {
        blob.rotate(-0.01);
        const amount = blob.segments.length;
        // Loop through the segments of the path:
        for (let i = 0; i < amount; i++) {
            // A cylic value between -1 and 1
            let sinus = Math.sin(event.time + i);
            // Change the y position of the segment point:
            // blob.segments[i]._point._y = sinus * 5 + 100;
            blob.segments[i].point.y += sinus/10;
            blob.segments[i].point.x += sinus/5;
        }
        // Uncomment the following line and run the script again
        // to smooth the path:
        blob.smooth();
    }

    // view.onFrame = function(event) {
    //     blob.rotate(0.1);
    //     let pathHeight = shapeHeight;
    //     const segments = blob.segments.length;
    //     pathHeight += pathHeight / 10;
    //     for (let i = 0; i < segments; i++) {
    //         let sinSeed = event.count + (i + i % 10) * 1000;
    //         let sinHeight = Math.sin(sinSeed / 1000) * (pathHeight / 2);
    //         //let yPos = Math.sin(sinSeed / 1000) * sinHeight;
    //         blob.segments[i]._point._y += Math.sin((i + i % 10) * (0.01));
    //         blob.segments[i]._point._x -= Math.sin((i + i % 10) * (0.01));
    //     }
    //     blob.position = view.center;
    //     //console.log(blob.position);
    //     blob.smooth({ type: 'continuous' });
    // };

    // view.onMouseMove = function(event) {
    //     return mousePos = event.point;
    // }

}

// helper function to add alpha transparency to gradient
function addCharToString (string) {
    let str = string.substring(0,string.length-1);
    let alpha = ' , 1';
    return str.padEnd(str.length + alpha.length,alpha) + ')';
}
