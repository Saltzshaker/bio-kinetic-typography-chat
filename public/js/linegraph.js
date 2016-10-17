var smoothie = new SmoothieChart({
  grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
          lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
  labels: { fillStyle:'rgb(60, 0, 0)' }
});

smoothie.streamTo(document.getElementById("mycanvas"));

// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();

// // Add a value from gsrData.txt to each line every second
// setInterval(function() {
//   $.get("text/gsrData.txt", function(data) {
//       gsrarr = data.split(",");
//   }).done(function() {
//     // get values from GSR array
//     e = gsrarr[gsr_index];
//     fakebase = e - .02;
//     gsr_index++;
//
//     // line1.append(new Date().getTime(), e);
//     // line2.append(new Date().getTime(), fakebase);
//   }, 1000);
// });

// if(gsrarr[0] !== null){
//   console.log("E4 Connected!");

// Add a random value to each line every second
setInterval(function() {
  line1.append(new Date().getTime(), Math.random());
  line2.append(new Date().getTime(), Math.random());
}, 1000);

// Add to SmoothieChart
smoothie.addTimeSeries(line1,
  { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });

  smoothie.addTimeSeries(line2,
    { strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });

smoothie.streamTo(document.getElementById("mycanvas"), 1000 /*delay*/);
