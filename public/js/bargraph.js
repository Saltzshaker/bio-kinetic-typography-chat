var updateInterval = 1000;  // milliseconds
// current EDA
var e1 = 0;
var e2 = 0;
var e3 = 0;
var e4 = 0;
var e5 = 0;
var e6 = 0;

// average baseline EDA
var b1 = .05;
var b2 = .05;
var b3 = .05;
var b4 = 0;
var b5 = .05;
var b6 = .05;

// GSR array and index of array
var gsrarr;
var gsrarr_index;

//Create line graph
window.onload = function () {

	var title = "Electrodermal Activity";

	var canvas = document.getElementById('chartContainer'),
	    ctx = canvas.getContext('2d'),
			startingData = {
	      labels: ["-5 sec","-4 sec", "-3 sec", "-2 sec", "-1 sec", "Now"],
	      datasets: [
	          {
								label: ["Current EDA"],
	              data: [e1, e2, e3, e4, e5, e6]
	          },
	          {
								label: ["My baseline EDA"],
	              data: [b1, b2, b3, b4, b5, b6]
	          }
	      ]
	    };

	// Create chart and load initial chart data

	var myLineChart = new Chart(ctx, {
	  type: 'line',
	  data: startingData
	});

	// Update at every updateInterval (1000 ms)

	setInterval(function(){
	  $.get("text/gsrData.txt", function(data) {
	      gsrarr = data.split(",");
	      gsr_index = gsrarr.length - 2;
	  }).done(function() {
					// get last 6 values from GSR array
	        e1 = gsrarr[gsr_index];
	        e2 = gsrarr[gsr_index-1];
	        e3 = gsrarr[gsr_index-2];
	        e4 = gsrarr[gsr_index-3];
	        e5 = gsrarr[gsr_index-4];
					e6 = gsrarr[gsr_index-5];

					// console.log("gsr_index: " + gsr_index);
					// console.log("expected e2: 0.09986565, actual e2: " + e2);
					// console.log("expected e3: 0.08986565, actual e3: " + e3);
					// console.log("expected e4: 0.07986565,, actual e4: " + e4);
					// console.log("expected e1: 0.107547626, actual e1: " + e1);
	        // console.log("expected e5: 0.107547626, actual e5: " + e5);
	    });

	  // Update each point in the second dataset
	  myLineChart.data.datasets[0].data[0] = e1;
	  myLineChart.data.datasets[0].data[1] = e2;
	  myLineChart.data.datasets[0].data[2] = e3;
	  myLineChart.data.datasets[0].data[3] = e4;
	  myLineChart.data.datasets[0].data[4] = e5;
		myLineChart.data.datasets[0].data[5] = e6;
	  myLineChart.update();

	}, updateInterval);
};
