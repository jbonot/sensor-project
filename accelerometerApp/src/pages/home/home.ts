import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceMotion, DeviceMotionAccelerationData } from 'ionic-native';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private subscription: Subscription;
  value: string;
  toggle: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  toggleRead() {
    if (this.toggle) {
      this.subscription = DeviceMotion.watchAcceleration({ frequency: 1000 }).subscribe(
        (acceleration: DeviceMotionAccelerationData) => {
          this.value = acceleration.x.toString();
        });
    } else {
      this.subscription.unsubscribe();
      this.value = '';
    }
  }
}
