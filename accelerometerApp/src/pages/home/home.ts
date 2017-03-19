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

  /**
   * Changes the URL of the server.
   *
   * Triggered on focus-out of input field for server URL.
   */
  updateBaseUrl() {
    this.accService.baseUrl = this.server;
  }

  /**
    * Enables or disables reading and sending of accerlerometer data.
    *
    * Triggered when the toggle is switched.
    */
  toggleRead() {
    if (!this.registered) {
      // Tell the server that this sensor exists.
      this.accService.registerSensor( this.name);
      this.registered = true;
    }

    if (this.toggle) {
      // Start reading acceleration values, and send this information to the server.
      this.subscription = DeviceMotion.watchAcceleration({ frequency: 1000 }).subscribe(
        (acceleration: DeviceMotionAccelerationData) => {
          this.value = acceleration.x.toString();
          this.accService.sendReading(this.value, acceleration.timestamp.toString());
        });
    } else {
      // Stop reading and sending acceleration information.
      this.subscription.unsubscribe();
      this.value = '';
    }
  }
}
