var avg;
var i;
var total = 0;
var inf;
// start at index 2 to skip the first lines of gsr text file, which don't contain values
var gsr_index = 2;
var numBaselineValues = 122;

// Hide the EDA range statuses until the data comes in
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
    fillStyle: 'rgb(255, 255, 255)',
    precision: 5,
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

// get avg EDA for numBaselineValues
getBaselineAvg();

// plotGSRData every second
setInterval(plotGSRData, 1000);

/*----------------------------------------------------
                    METHODS
----------------------------------------------------*/

// get average of baseline values
// start at index 2 to skip the first lines of gsr text file, which don't contain values
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

/*-----------
plotGSRData
Add a value from gsrData.txt to the linegraph
Set influence as high (above baseline) or low (below baseline) based on the last EDA value
-----------*/
function plotGSRData() {

    $.get("text/gsrData.txt", function(data) {
        gsrarr = data.split(",");
    }).done(function() {
        // iterate through values in gsr array
        eda = gsrarr[gsr_index];
        gsr_index++;

        var lastEda = gsrarr[gsrarr.length-2];
        var endOfBaselineEda = gsrarr[numBaselineValues];

        // When no data, show no data label
        if (eda == undefined) {
          $("#no_data").show();
          $("#calculating_baseline").hide();
          $("#baseline_calculated").hide();
          $('#low_range').hide();
          $('#high_range').hide();
        }

        // When data has come in, but not up to baseline, show calculating baseline label
        else if (gsrarr[numBaselineValues] == undefined && eda != undefined) {
          $("#calculating_baseline").show();
          $("#baseline_calculated").hide();
          $("#no_data").hide();
          $("#range_label").hide();
        }

        // When the baseline value is defined, show baseline calculated label and plot avg as baseline and last EDA value as current
        else if (endOfBaselineEda != undefined) {
            $("#calculating_baseline").hide();
            $("#no_data").hide();
            $("#baseline_calculated").show();
            line1.append(new Date().getTime(), lastEda);
            edaBaseline = avg;
            line2.append(new Date().getTime(), edaBaseline);
        }

        // if the baseline value is defined and lastEda is above average, show Above Baseline label and set influence to high
        if (endOfBaselineEda != undefined && lastEda > avg)  {
            console.log("high eda " + lastEda + " vs avg " + avg);
            inf = "high";
            // change data range label
            $("#range_label").show();
            $("#high_range").show();
            $('#low_range').hide();
        }

        // if the baseline value is defined and lastEda is below average, show Below Baseline label and set influence to low
        if (endOfBaselineEda != undefined && lastEda < avg) {
            console.log("low eda " + lastEda + " vs avg " + avg);
            inf = "low"
            // change data range label
            $("#range_label").show();
            $("#low_range").show();
            $('#high_range').hide();
        }
    });
}
