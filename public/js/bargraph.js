var a, b, d, g, t;

//create bar graph of the five EEG signal's band power
window.onload = function () {
		// initial values of dataPoints
		var dps = [
		{label: "Alpha", y: 5, backgroundColor: 'rgba(10,10,10)'},
		{label: "Beta", y: 4},
		{label: "Delta", y: 4},
		{label: "Gamma", y: 1},
		{label: "Theta", y: 8}
		];
		
		CanvasJS.addColorSet("greenShades",
        [
			"#2F4F4F",
            "#008080",
            "#2E8B57",
            "#3CB371",
            "#90EE90"                
        ]);
                
		var title = "Brain Waves";

		var chart = new CanvasJS.Chart("chartContainer",{
		
			height: 200,
			
			colorSet: "greenShades",
			title:{ 
				text: ""
			},
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
			dps[1].y = b;
			dps[2].y = d;
			dps[3].y = g;
			dps[4].y = t;
			chart.render();
		};
		// update chart after specified interval
		setInterval(function(){updateChart()}, updateInterval);
}

function addDeltaGraph(data) {
	d = data;
}
function addThetaGraph(data) {
	t = data;
}
function addGammaGraph(data) {
	g = data;
}
function addAlphaGraph(data) {
	a = data;
}
function addBetaGraph(data) {
	b = data;
}	
