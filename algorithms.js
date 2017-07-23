class Algorithms {
  constructor() {
    var iterationNumberArray;
  }

  // TODO: sort modes (e.g. by brightness, hue, etc.)

  selectionSort() {
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
}
