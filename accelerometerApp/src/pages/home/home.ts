import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceMotion, DeviceMotionAccelerationData } from 'ionic-native';
import { Subscription }   from 'rxjs/Subscription';

import { DummySensor } from 'dummy-sensor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private subscription: Subscription;
  private sensor: DummySensor;
  private name: string = 'Mobile Accelerometer';
  value: string;
  toggle: boolean = false;

  constructor(public navCtrl: NavController) {
    this.sensor = new DummySensor(3500, {frequency: 1000});
    this.sensor.onchange = event => this.sensor.reading = event.reading;
    this.sensor.name = this.name;
    this.sensor.formula = () => { return +this.value };
  }

  toggleRead() {
    if (this.toggle) {
      this.subscription = DeviceMotion.watchAcceleration({ frequency: 1000 }).subscribe(
        (acceleration: DeviceMotionAccelerationData) => {
          this.value = acceleration.x.toString();
          this.sensor.start();
        });
    } else {
      this.sensor.stop();
      this.subscription.unsubscribe();
      this.value = '';
    }
  }
}
