import { Injectable } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private emailComposer: EmailComposer
  ) { }

  async getClients() {
    const clients = await this.emailComposer.getClients();
    return clients;
  }

  send(app, email) {
    this.emailComposer.isAvailable().then(app, (available: boolean) => {
      if (available) {
        this.emailComposer.open(email);
      }
    });
  }
}
