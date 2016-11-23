var avg;
var i = 0;
var total = 0;
var inf;
// start at index 2 to skip the first lines of gsr text file, which don't contain values
var gsr_index = 2;
var gsr_baseline_index = 2;
var edaBaseline;
var numBaselineValues = 10;

var smoothie = new SmoothieChart({
    maxValue: .12,
    minValue: 0,
    grid: {
        strokeStyle: 'rgb(125, 125, 125)',
        fillStyle: 'rgb(60, 60, 60)',
        lineWidth: 1,
        millisPerLine: 250,
        verticalSections: 6,
    },
    labels: {
        fillStyle: 'rgb(255, 255, 255)'
    },
    // timestampFormatter:SmoothieChart.timeFormatter
});

smoothie.streamTo(document.getElementById("mycanvas"));

// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();

// Hide the EDA range status until data comes in
$("#low_range").hide();
$("#high_range").hide();

/* Add a value from gsrData.txt to the linegraph
Set influence based on EDA value
*/
// start at 2 to cut out initial calibration value

function plotGSRData() {

    $.get("text/gsrData.txt", function(data) {
        gsrarr = data.split(",");
    }).done(function() {
        eda = gsrarr[gsr_index];
        edaBaseline = gsrarr[gsr_baseline_index];
        gsr_index++;
        gsr_baseline_index++
        // console.log("edaBaseline: " + edaBaseline + " gsr_baseline_index: " + gsr_baseline_index);
        // console.log("eda: " + eda + " gsr_index: " + gsr_index);


        line2.append(new Date().getTime(), edaBaseline);

        if (gsr_index > numBaselineValues) {
            line1.append(new Date().getTime(), eda);
            gsr_baseline_index = 0;
        }

        if (eda > 0.097) {
            inf = "high";
            // change data range label
            $("#high_range").show();
            $('#low_range').hide();
        } else {
            // refactor so low influence maps to slow animation in main.js
            inf = "low"
            // change data range label
            $("#low_range").show();
            $('#high_range').hide();
        }
    });
}


//
// var baselineCounter = setInterval(function(){
//   eda = gsrarr[i];
//   total += eda;
//   console.log("avg: " + avg);
//   console.log("eda: " + eda);
//   console.log("total: " + total);
//   i++;
//
//   if (i == gsrarr.length) {
//     avg = total/gsrarr.length;
//     console.log("done");
//     clearInterval(baselineCounter);
//     console.log ("avg: " + avg);
//     return avg;
//   }
// }, 1000);

function getBaselineAvg() {

    $.get("text/gsrData.txt", function(data) {
        gsrarr = data.split(",");
    }).done(function() {

        var baselineCounter = setInterval(function() {


            eda = gsrarr[i];
            total += eda;
            // console.log("avg: " + avg);
            // console.log("eda: " + eda);
            // console.log("total: " + total);
            i++;

            if (i == numBaselineValues) {
                avg = total / numBaselineValues;
                console.log("done");
                clearInterval(baselineCounter);
                console.log("avg: " + avg);
                return avg;
            }
        }, 1000);



    });
}

getBaselineAvg();


/*

1. Collect baseline (line2)

  setInterval(plotBaseline, 1000);

  Show alert: "Calculating baseline state"
  Don't show low range/high range

  if (gsr_index > numBaselineValues) {
    clearInterval(interval); // stop the interval
    Change "Calculating baseline state" to "Begin chat"
  }

2. On "Begin chat" click, overlay baseline and live data

  setInterval(plotGSRData, 1000);
  line2 is set to avg of baseline values

*/

// plotGSRData every second
setInterval(plotGSRData, 1000);

// Add to SmoothieChart
smoothie.addTimeSeries(line1, {
    strokeStyle: 'rgb(255, 0, 255)',
    fillStyle: 'rgba(255, 0, 255, 0.3)',
    lineWidth: 3
});

smoothie.addTimeSeries(line2, {
    strokeStyle: 'rgb(91,192,222)',
    fillStyle: 'rgba(91, 192, 222, 0.6)',
    lineWidth: 3
});

smoothie.streamTo(document.getElementById("mycanvas"), 1000 /*delay*/ );
