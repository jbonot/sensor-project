"use strict";

let data = null;

let drawChart = function() {
    // Define the chart to be drawn.
    data = new google.visualization.DataTable();
    // google.visualization.drawChart({"refreshInterval:" 5});

    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Temp');
    data.addColumn('number', 'Wind Speed MPH');

    // Instantiate and draw the chart.
    var chart = new google.visualization.LineChart(document.getElementById('myPieChart'));
    chart.draw(data, null);
}

let renderData = function( /* serverResponse*/ ) {
    if (data) {
      console.log("Adding data to chart!");
      // TODO @lavinia: Render the actual response that is coming from the server.
      data.addRow([new Date(Date.now()), Math.random(), Math.random()]);
      console.log("done!");
    }

}

google.charts.load('current', {
    packages: ['corechart']
});

google.charts.setOnLoadCallback(drawChart);
