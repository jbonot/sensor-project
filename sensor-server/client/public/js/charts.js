"use strict";

let data = new Map();
let tables = new Map();
let ids = ['humidity-chart', 'temperature-chart', 'sound-chart', 'light-chart'];

let drawChart = function() {
    // Define the chart to be drawn.
    for (var i=0; i<ids.length; i++) {
      let id = ids[i];
      let entry = new google.visualization.DataTable();
      entry.addColumn('number', 'Timestamp');
      entry.addColumn('number', 'value');
      var chart = new google.visualization.LineChart(document.getElementById(ids[i]));
      chart.draw(entry, null);
      data.set(ids[i], entry);
    }
}

/**
 * @param {string} elementId The id of the chart div section in the html page.
 * @param {Object} reading A sensor reading.
 */
let renderData = function(elementId, reading) {
    if (data) {
      let row = data.get(elementId);
      row.addRow([reading._timestamp, reading._dummyValue]);
      data.set(elementId, row);
    }
    for (var i=0; i<ids.length; i++) {
      let id = ids[i];
      var options = {'title' : 'Sensor reading'};
      var chart = new google.visualization.LineChart(document.getElementById(id));
      chart.draw(data.get(id), options);
    }
}

google.charts.load('current', {
    packages: ['corechart']
});

google.charts.setOnLoadCallback(drawChart);
