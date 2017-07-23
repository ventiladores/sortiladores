var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'Samsung_Electric_Fan.jpg'; // https://commons.wikimedia.org/wiki/File:Samsung_Electric_Fan.JPG
// img.src = 'noise.png';

var rowLength = canvas.width;
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  rowLength = canvas.width;
  main();
};

function copyPixel(dest, destIndex, orig, origIndex) {
  dest[destIndex] = orig[origIndex]; // Red
  dest[destIndex + 1] = orig[origIndex + 1]; // Green
  dest[destIndex + 2] = orig[origIndex + 2]; // Blue
  // dest[destIndex+3] = orig[origIndex+3]; // Alpha
}

var algorithms = new Algorithms();

// thanks to https://stackoverflow.com/a/15505418 for the mouseup/down behaviour
var mousedownID = -1;
var rowNumber;

function onMouseUp(e) {
  if (mousedownID != -1) { // Only stops if exists
    clearInterval(mousedownID);
    mousedownID = -1;
  }
}

function onMouseMove(e) {
  rowNumber = e.clientY; // y position of mouse is the row that's being sorted
}

function onMouseDown(e) {
  rowNumber = e.clientY;
  if (mousedownID == -1) { // Prevent multiple loops
    mousedownID = setInterval(algorithms.selectionSort, 5);
  }
}

function main() {
  iterationNumberArray = new Array(canvas.height);
  iterationNumberArray.fill(0);

  // sort the row you click:
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
}

// TODO: find a way to save e.clientY on every iteration of sortOnClick
//    - sort from beginning of row to x position of mouse: rowData = ctx.getImageData(0, rowNumber, [mouse x position], 1);
// TODO: use dat.GUI (https://github.com/dataarts/dat.gui)
