import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AccelerometerData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccelerometerData {
  baseUrl: string;

  constructor(public http: Http) {
  }

  /**
    * Informs the server that this sensor exists.
    */
  registerSensor(id: number, name: string) {
    this.http.post(this.baseUrl + '/api/sensors/register/' + id + '/' + name, {}).subscribe(data => {
      console.log(data);
    });
  }

  /**
    * Sends acceleration data to the server.
    */
  sendReading(id: string, value: string) {
    this.http.put(this.baseUrl + '/api/sensors/' + id + '/reading/' + value, {}).subscribe(data => {
      console.log(data);
    });
  }
}
