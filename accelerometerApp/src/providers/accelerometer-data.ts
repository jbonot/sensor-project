import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Device } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the AccelerometerData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccelerometerData {
  id: string = Device.serial;
  baseUrl: string;

  constructor(public http: Http) {
  }

  /**
    * Sends acceleration data to the server.
    */
  sendReading(value: string, timestamp: string) {
    this.http.put(this.baseUrl + '/api/sensors/' + this.id + '/reading/' + value + '/' + timestamp, {}).subscribe(data => {
      console.log(data);
    });
  }
}
