var inf;
// start at index 2 to skip the first lines of gsr text file, which don't contain values
var gsr_index = 2;
var gsr_baseline_index = 2;
var edaBaseline;

var smoothie = new SmoothieChart({
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

/* Add a value from gsrData.txt to the linegraph
Set influence based on EDA value

*/
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

        if (gsr_baseline_index > 181) {
          gsr_baseline_index = 0;
        }

        if (gsr_index > 181) {
          line1.append(new Date().getTime(), eda);
        }

        line2.append(new Date().getTime(), edaBaseline);

        if (eda > 0.097) {
            inf = "stressed";
        } else {
            inf = "chill"
        }
    });
}

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
