var a, b, d, g, t;

//create bar graph of the five EEG signal's band power
window.onload = function () {
		// initial values of dataPoints
		var dps = [
		{label: "Alpha", y: 5, backgroundColor: 'rgba(10,10,10)'}
		];

		var title = "Brain Waves";

		var chart = new CanvasJS.Chart("chartContainer",{

			height: 200,
			axisY: {
				title: "Relative Band Power"
			},
			legend:{
				verticalAlign: "top",
				horizontalAlign: "centre",
				fontSize: 18,
				fontFamily: "Tahoma, Geneva, sans-serif"
			},
			data : [{
				type: "column",
				showInLegend: true,
				legendMarkerType: "none",
				legendText: title,
				indexLabel: "{y}",
				dataPoints: dps
			}]
		});

		// renders initial chart
		chart.render();
		var updateInterval = 1000;  // milliseconds

		var updateChart = function () {
			dps[0].y = a;
			chart.render();
		};
		// update chart after specified interval
		setInterval(function(){updateChart()}, updateInterval);
}

function addAlphaGraph(data) {
	a = data;
}
