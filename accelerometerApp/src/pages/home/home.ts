import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceMotion, DeviceMotionAccelerationData } from 'ionic-native';
import { Subscription }   from 'rxjs/Subscription';
import { AccelerometerData } from '../../providers/accelerometer-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private subscription: Subscription;
  private name: string = 'Accelerometer App';
  private registered: boolean = false;

  server: string = 'http://';
  value: string;
  toggle: boolean = false;

  constructor(public navCtrl: NavController, public accService: AccelerometerData) {

  }

  updateBaseUrl() {
    this.accService.baseUrl = this.server;
  }

  toggleRead() {
    if (!this.registered) {
      this.accService.registerSensor(12345, this.name);
      this.registered = true;
    }

    if (this.toggle) {
      this.subscription = DeviceMotion.watchAcceleration({ frequency: 1000 }).subscribe(
        (acceleration: DeviceMotionAccelerationData) => {
          this.value = acceleration.x.toString();
          this.accService.sendReading('1234500-12345000', this.value);
        });
    } else {
      this.subscription.unsubscribe();
      this.value = '';
    }
  }
}
