var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'Samsung_Electric_Fan.jpg'; // https://commons.wikimedia.org/wiki/File:Samsung_Electric_Fan.JPG

function copyPixel(dest, destIndex, orig, origIndex) {
  dest[destIndex] = orig[origIndex]; // Red
  dest[destIndex + 1] = orig[origIndex + 1]; // Green
  dest[destIndex + 2] = orig[origIndex + 2]; // Blue
  // dest[destIndex+3] = orig[origIndex+3]; // uncomment to copy A values too
}

function main() {

  // sort rows by green
  // TODO: print row in every sort iteration + delay

  var rowLength = canvas.width;
  for (var i = 0; i < canvas.height; i++) {
    var rowData = ctx.getImageData(0, i, rowLength, 1);
    var data = rowData.data;
    for (var j = 0; j < data.length; j += 4) {
      var min = 255;
      var minIndex;
      for (var k = j; k < data.length; k += 4) {
        if (data[k + 2] < min) { // k - red; k+1 - green; k+2 - blue
          min = data[k + 2];
          minIndex = k;
        }
      }
      var swap = [data[j], data[j + 1], data[j + 2]];
      copyPixel(data, j, data, minIndex);
      copyPixel(data, minIndex, swap, 0);
    }
    ctx.putImageData(rowData, 0, i);
  }
}

img.onload = function() {
  ctx.canvas.width = img.width;
  ctx.canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  main();
};
