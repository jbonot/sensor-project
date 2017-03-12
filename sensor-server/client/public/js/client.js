"use strict";

console.log("this is public/js/client.js");
var xhttp = new XMLHttpRequest();
// Fill in the dashboard based on the response.

let sensors = {
  "Humidity Sensor": "humidity",
  "Temperature Sensor": "temperature",
  "Ambient Light Sensor": "light",
  "Sound Intensity Sensor": "sound"
}

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response);
        console.log(response);
        for (let key in response) {
         let sensorElement = sensors[response[key]];
          document.getElementById(sensorElement+"-id").value = key;
          document.getElementById(sensorElement+"-name").value = response[key];
        }
    }
};

// TODO: @lavinia don't hardcode the url. Fix this.
xhttp.open("GET", "https://localhost:8080/api/sensors", true);
xhttp.send();



// Sensor readings feed in realtime.
// TODO: @lavinia fix harcoded address.
let socket = new WebSocket("ws://localhost:8081");
socket.onmessage = function(event) {
    let message = JSON.parse(event.data);
    for (let key in message) {
     let sensorElement = sensors[message[key]._name];
     renderData(sensorElement+"-chart", message[key]);
    }
};
