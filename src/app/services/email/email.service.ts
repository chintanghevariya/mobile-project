import { Injectable } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private emailComposer: EmailComposer
  ) { }

  async canUse() {
    return await this.emailComposer.isAvailable();
  }

  async getClients() {
    const clients = await this.emailComposer.getClients()
    console.log(clients);

    // this.emailComposer.getClients().then((apps: []) => {
    //   // Returns an array of configured email clients for the device
    //   console.log(apps);

    // });
  }

  send(app, email) {
    this.emailComposer.isAvailable().then(app, (available: boolean) => {
      if (available) {
        this.emailComposer.open(email);
      }
    });
  }
}
