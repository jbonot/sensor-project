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

  constructor(public http: Http) {
  }

  registerSensor(id: number, name: string) {
    this.http.post('http://192.168.0.13:8080/api/sensors/register/' + id + '/' + name, {}).subscribe(data => {
      console.log(data);
    });
  }

  sendReading(id: string, value: string) {
    this.http.put('http://192.168.0.13:8080/api/sensors/' + id + '/reading/' + value, {}).subscribe(data => {
      console.log(data);
    });
  }
}
