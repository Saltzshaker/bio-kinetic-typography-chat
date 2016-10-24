var inf;
var gsr_index = 0;
var smoothie = new SmoothieChart({
  grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
          lineWidth: 1, millisPerLine: 250, verticalSections: 6,
        },
  labels: { fillStyle:'rgb(255, 255, 255)' },
  // timestampFormatter:SmoothieChart.timeFormatter
});

smoothie.streamTo(document.getElementById("mycanvas"));

// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();

/* Add a value from gsrData.txt to the linegraph
Set influence based on EDA value

*/
function plotGSRData() {

  $.get("text/gsrData.txt", function(data) {
    gsrarr = data.split(",");
  }).done(function() {
    eda = gsrarr[gsr_index];
    var edaFake = eda - .02;
    gsr_index++;

    line1.append(new Date().getTime(), eda);
    line2.append(new Date().getTime(), edaFake);

    if(eda > 0.097){
      inf = "stressed";
    }

    else {
      inf = "chill"
    }

    console.log(inf);
    // console.log(eda);
  });
}




// plotGSRData every second
setInterval(plotGSRData, 1000);

// // Add a value from gsrData.txt to each line every second
// window.onload = function () {
//   setInterval(getE4data, 1000);
// }
//
// function getE4data() {
//   $.get("text/gsrData.txt", function(data) {
//       gsrarr = data.split(",");
//   }).done(function() {
//     // get values from GSR array
//     e = gsrarr[gsr_index];
//     line1.append(new Date().getTime(), e);
//     line2.append(new Date().getTime(), fakebase);
//     gsr_index++;
//   });
// }

// if(gsrarr[0] !== null){
//   console.log("E4 Connected!");

// Add a random value to each line every second
// setInterval(function() {
//   line1.append(new Date().getTime(), Math.random());
//   line2.append(new Date().getTime(), Math.random());
// }, 1000);

// Add to SmoothieChart
smoothie.addTimeSeries(line1,
  { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });

smoothie.addTimeSeries(line2,
  { strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });

smoothie.streamTo(document.getElementById("mycanvas"), 1000 /*delay*/);
