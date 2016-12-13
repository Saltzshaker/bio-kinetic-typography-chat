var avg;
var i = 0;
var total = 0;
var inf;
// start at index 2 to skip the first lines of gsr text file, which don't contain values
var gsr_index = 2;
var edaBaseline;
var numBaselineValues = 10;


// Hide the EDA range status until data comes in
$("#low_range").hide();
$("#high_range").hide();
$("#range_label").hide();

/*----------------------------------------------------
                SMOOTHIE CHART
----------------------------------------------------*/

var smoothie = new SmoothieChart({
  // maxValue: .12,
  // minValue: 0,
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


/*----------------------------------------------------
                FUNCTION CALLS
----------------------------------------------------*/

// get avg eda for numBaselineValues
getBaselineAvg();

// plotGSRData every second
setInterval(plotGSRData, 1000);

/*----------------------------------------------------
                    METHODS

setInterval
----------------------------------------------------*/



/*-----------
Get avg eda for numBaselineValues
-----------*/
function getBaselineAvg() {

  $.get("text/gsrData.txt", function(data) {
    gsrarr = data.split(",");
  }).done(function() {
    for (i = 2; i < numBaselineValues; i++) {
      eda = parseFloat(gsrarr[i]);
      total += eda;
      avg = total/(numBaselineValues - 2);
      if (i == numBaselineValues - 1) {
        console.log ("baseline avg: " + avg);
        return avg;
      }
    }
  });
}

console.log("avg out of loop " + getBaselineAvg());

/*-----------
plotGSRData
Add a value from gsrData.txt to the linegraph
Set influence based on EDA value
-----------*/
function plotGSRData() {

    $.get("text/gsrData.txt", function(data) {
        gsrarr = data.split(",");
    }).done(function() {
        eda = gsrarr[gsr_index];
        edaBaseline = gsrarr[gsr_index];
        gsr_index++;
        console.log("eda: " + eda);
        var modifiedAvg = avg - (avg/2);

        if (eda == undefined) {
          $("#no_data").show();
          $("#calculating_baseline").hide();
          $("#baseline_calculated").hide();
          $('#low_range').hide();
          $('#high_range').hide();
        }

        else if (gsr_index > 0 && gsr_index < numBaselineValues && eda != undefined) {
          $("#calculating_baseline").show();
          $("#baseline_calculated").hide();
          $("#no_data").hide();
          $("#range_label").hide();
        }

        else if (gsr_index > numBaselineValues && eda != undefined) {
            $("#calculating_baseline").hide();
            $("#no_data").hide();
            $("#baseline_calculated").show();
            line1.append(new Date().getTime(), eda);
            edaBaseline = modifiedAvg;
            line2.append(new Date().getTime(), edaBaseline);
        }

        if (gsr_index > numBaselineValues && eda > modifiedAvg)  {
            console.log("in high " + modifiedAvg);
            inf = "high";
            // change data range label
            $("#range_label").show();
            $("#high_range").show();
            $('#low_range').hide();
        }

        if (eda < modifiedAvg && gsr_index > numBaselineValues) {
            inf = "low"
            // change data range label
            $("#range_label").show();
            $("#low_range").show();
            $('#high_range').hide();
        }
    });
}
