'use strict';// --- Global or Module Scope ---
var n=0;// Consider managing this state differently if possible
var sharedMousePos={x:window.innerWidth/2,y:window.innerHeight/2};// Assuming Paper.js view matches window
var sharedGyroData={alpha:0,beta:0,gamma:0,active:false};var debugText=null;// --- Helper Functions ---
function getRandomInt(){var min=arguments.length>0&&arguments[0]!==undefined?arguments[0]:3;var max=arguments.length>1&&arguments[1]!==undefined?arguments[1]:15;return Math.floor(Math.random()*(max-Math.ceil(min)))+Math.ceil(min)}function formatColorForGradient(colorString){// A more robust way to ensure 'rgba(r,g,b,1)' format or use Paper.js Color objects
// This simplified version assumes colorString is like 'rgb(r,g,b)'
if(colorString.startsWith('rgb(')&&colorString.endsWith(')')){return colorString.substring(0,colorString.length-1)+' , 1)'}// Add handling for other formats if necessary, or convert to paper.Color
var pColor=new paper.Color(colorString);pColor.alpha=1;return pColor.toCSS(true);// true for hex if possible, or use .toCSS() for rgba
}function createBlobPath(center,maxRadius,points){var path=new paper.Path;path.closed=true;for(var i=0;i<points;i++){var delta=new paper.Point({length:maxRadius*0.5+Math.random()*maxRadius*0.5,angle:360/points*i});path.add(center.add(delta));// Add delta to center for correct initial positioning
}path.smooth();return path}// --- Event Handlers (Setup Once) ---
function globalHandleOrientation(event){sharedGyroData.active=true;// Or check navigator.userAgentData.mobile once
sharedGyroData.alpha=event.alpha||0;sharedGyroData.beta=event.beta||0;sharedGyroData.gamma=event.gamma||0;if(sharedGyroData.active&&!debugText&&paper.project){// Ensure paper is ready
debugText=new paper.PointText({point:[10,30],content:'gamma: '+Math.round(sharedGyroData.gamma),justification:'left',fillColor:'black',fontFamily:'Courier New',fontSize:12})}}function globalHandleMouseMove(event){// Assuming event is a Paper.js mouse event
if(event.point){sharedMousePos=event.point}else{// Fallback for standard browser events if view isn't the direct target
var rect=paper.view.element.getBoundingClientRect();sharedMousePos={x:event.clientX-rect.left,y:event.clientY-rect.top}}}// Call these once, e.g., when your Paper.js canvas/app is initialized
// Ensure 'paper.view' is available if using it directly in handlers
// window.addEventListener("deviceorientation", globalHandleOrientation, { passive: true });
// paper.view.onMouseMove = globalHandleMouseMove; // Or attach to canvas element
// --- Main Function ---
function applyGradientToCanvas(stopOne,stopTwo,isLast){// Ensure Paper.js objects (view, project, Point, Path, Color) are available,
// often by prefixing with 'paper.' if not globally exposed by PaperScript.
var _paper=paper,view=_paper.view,project=_paper.project,Point=_paper.Point,Path=_paper.Path,Color=_paper.Color;if(project.activeLayer.children.length>0&&n<2){// Simpler check than !!
project.activeLayer.removeChildren()}var gradientStopOne=formatColorForGradient(stopOne);var gradientStopTwo=formatColorForGradient(stopTwo);var center=view.center.clone();// Clone to avoid modifying original view.center if path.add uses it
var numPoints=getRandomInt();var radius=view.size.width<=375?view.size.width-150:250;// Create the blob, using createBlobPath which now expects center
var blob=createBlobPath(new Point(0,0),radius,numPoints);// Create at origin, then position
blob.position=center;isLast?n=0:++n;// Apply styles
blob.style={strokeColor:stopOne,strokeWidth:1,shadowColor:new Color(0,0,0,0.5),shadowBlur:100};blob.fillColor={gradient:{stops:[gradientStopOne,gradientStopTwo]},// Simpler stop format
origin:blob.bounds.topLeft,// Common to use topLeft for origin
destination:blob.bounds.bottomRight// and bottomRight for destination
};// --- Animation Frame Logic ---
view.onFrame=function(event){var halfWidth=view.size.width/2;var halfHeight=view.size.height/2;var rotationSpeed=0.03;var currentRotation=rotationSpeed;var targetX=halfWidth+(halfWidth-sharedMousePos.x)/10;var targetY=halfHeight+(halfHeight-sharedMousePos.y)/10;if(sharedGyroData.active){currentRotation=sharedGyroData.alpha>180&&sharedGyroData.alpha<360?-rotationSpeed:rotationSpeed;// Ensure beta and gamma are providing expected ranges. Beta often 0-180 or -90 to 90.
// The (betaY-90) suggests beta might be 0-180, wanting to center it around 0.
targetX=halfWidth+(halfWidth-sharedGyroData.gamma*10)/10;// Adjust sensitivity as needed
targetY=halfHeight+(halfHeight-(sharedGyroData.beta-90)*10)/10;// Adjust sensitivity
}else{currentRotation=sharedMousePos.x>halfWidth?-rotationSpeed:rotationSpeed}var dx=(targetX-blob.position.x)*0.01;// Easing factor (0.01 for 1%)
var dy=(targetY-blob.position.y)*0.01;blob.rotate(currentRotation);blob.position.x+=dx;blob.position.y+=dy;for(var i=0;i<blob.segments.length;i++){// Using different phases or multipliers for X and Y makes movement more organic
var offsetY=Math.sin(event.time*1.5+i*0.5)*0.1;// Adjusted speed and phase
var offsetX=Math.sin(event.time*1.2+i*0.3)*0.2;// Adjusted speed and phase
blob.segments[i].point.y+=offsetY;blob.segments[i].point.x+=offsetX}blob.smooth();if(sharedGyroData.active&&debugText){debugText.content='G: '+Math.round(sharedGyroData.gamma)+', B: '+Math.round(sharedGyroData.beta)+', A: '+Math.round(sharedGyroData.alpha);// Optional: update debugText position if it needs to follow something or avoid overlap
// debugText.point = [view.bounds.left + 10, view.bounds.top + 30];
}};// Setup global mouse move listener ONCE if not already done
if(!paper.view.onMouseMove){// Simple check, might need more robust flag
paper.view.onMouseMove=globalHandleMouseMove}if(!window.ondeviceorientation){// Very basic check, better to use a flag
window.addEventListener('deviceorientation',globalHandleOrientation,{passive:true});window.ondeviceorientation=globalHandleOrientation;// Mark that it's set
}}