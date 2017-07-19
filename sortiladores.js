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

var iterationNumber = 0;
function iteration() {
  var rowData = ctx.getImageData(0, iterationNumber, rowLength, 1);
  var data = rowData.data;
  // SELECTION SORT
  for (var j = 0; j < data.length; j += 4) {
    var minIndex = j;
    for (var k = j + 4; k < data.length; k += 4) {  // change x in "j + x" for other neat effects
      if (data[k + 2] < data[minIndex + 2]) { // sort rows by blue
        minIndex = k;
      }
    }
    if (minIndex != j) {
      var swap = [data[j], data[j + 1], data[j + 2]];
      copyPixel(data, j, data, minIndex);
      copyPixel(data, minIndex, swap, 0);
    }
  }
  ctx.putImageData(rowData, 0, iterationNumber);
  iterationNumber = (iterationNumber+1) % canvas.height;
}

function main() {
  // var buttonIterate = document.getElementById('iterate');
  // buttonIterate.onclick = iteration;
  for (var i = 0; i < canvas.height; i++) {
    iteration();
  }
}
