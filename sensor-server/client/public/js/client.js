"use strict";

console.log("this is public/js/client.js");
var xhttp = new XMLHttpRequest();
var acSensorId = "HT23KW404505";
// Fill in the dashboard based on the response.

let sensors = {
  "Humidity Sensor": "humidity",
  "Temperature Sensor": "temperature",
  "Ambient Light Sensor": "light",
  "Sound Intensity Sensor": "sound",
  "Acceleration Sensor": "acceleration"
}

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response);
        console.log(response);
        if (response["latest-value"] == undefined) {
          for (let key in response) {
           let sensorElement = sensors[response[key].name];
           if (sensorElement == "acceleration") {
             acSensorId = response[key].id;
           }
            document.getElementById(sensorElement+"-id").value = response[key].id;
            document.getElementById(sensorElement+"-name").value = response[key].name;
            document.getElementById(sensorElement+"-location").value = response[key].location;
          }
        }  else {
           console.log(response["latest-value"]);
           renderData("acceleration-chart", response["latest-value"]);
        }
    }
};

xhttp.open("GET", "http://localhost:8080/api/sensors", true);
xhttp.send();



// Dummy sensor readings feed in realtime.
let socket = new WebSocket("ws://localhost:8081");
socket.onmessage = function(event) {
    let message = JSON.parse(event.data);
    for (let key in message) {
     let sensorElement = sensors[message[key]._name];
     if (sensorElement != "acceleration") {
       renderData(sensorElement+"-chart", message[key]);
     }
    }
};

setInterval(function(){
  xhttp.open("GET", "http://localhost:8080/api/sensors/" + acSensorId +
  "/sensorReadings/latest", true);
  xhttp.send();
}, 1000);
