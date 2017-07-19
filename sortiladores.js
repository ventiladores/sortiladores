var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'Samsung_Electric_Fan.jpg'; // https://commons.wikimedia.org/wiki/File:Samsung_Electric_Fan.JPG

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

// var rowNumber = 0;
// function iteration() {
//   var rowData = ctx.getImageData(0, rowNumber, rowLength, 1);
//   var data = rowData.data;
//   // SELECTION SORT
//   for (var j = 0; j < data.length; j += 4) {
//     var minIndex = j;
//     for (var k = j + 4; k < data.length; k += 4) {  // change x in "j + x" for other neat effects
//       if (data[k + 2] < data[minIndex + 2]) { // sort rows by blue
//         minIndex = k;
//       }
//     }
//     if (minIndex != j) {
//       var swap = [data[j], data[j + 1], data[j + 2]];
//       copyPixel(data, j, data, minIndex);
//       copyPixel(data, minIndex, swap, 0);
//     }
//   }
//   ctx.putImageData(rowData, 0, rowNumber);
//   rowNumber = (rowNumber+1) % canvas.height;
// }

// thanks to https://stackoverflow.com/a/15505418 for the mouseup/down behaviour
var mousedownID = -1;
var rowNumber;

function onMouseUp(e) {
  console.log("mouse UP");
  if (mousedownID != -1) { // Only stops if exists
    clearInterval(mousedownID);
    mousedownID = -1;
  }
}

function onMouseDown(e) {
  console.log("mouse DOWN");
  rowNumber = e.clientY; // y position of mouse is the row that's being sorted
  if (mousedownID == -1) { // Prevent multiple loops
    mousedownID = setInterval(sortOnClick, 25);
  }
}

var iterationNumberArray;

function sortOnClick() {
  console.log("iterando ", iterationNumberArray[rowNumber]);
  var iter = iterationNumberArray[rowNumber]; // iteration number on current row
  var rowData = ctx.getImageData(0, rowNumber, rowLength, 1);
  var data = rowData.data;
  var minIndex = iter;
  for (var k = iter + 4; k < data.length; k += 4) {
    if (data[k + 2] < data[minIndex + 2]) { // sort rows by blue
      minIndex = k;
    }
  }
  if (minIndex != iter) {
    var swap = [data[iter], data[iter + 1], data[iter + 2]];
    copyPixel(data, iter, data, minIndex);
    copyPixel(data, minIndex, swap, 0);
  }
  ctx.putImageData(rowData, 0, rowNumber);
  iterationNumberArray[rowNumber] = (iterationNumberArray[rowNumber] + 4) % data.length;
}

function main() {
  iterationNumberArray = new Array(canvas.height);
  iterationNumberArray.fill(0);

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);



  // sort with a button:
  // var buttonIterate = document.getElementById('iterate');
  // buttonIterate.onclick = iteration;

  // sort all rows in one go:
  // for (var i = 0; i < canvas.height; i++) {
  //   iteration();
  // }
}

// TODO: find a way to save e.clientY on every iteration of sortOnClick
//    - sort from beginning of row to x position of mouse: rowData = ctx.getImageData(0, rowNumber, [mouse x position], 1);
// TODO: use dat.GUI (https://github.com/dataarts/dat.gui)
