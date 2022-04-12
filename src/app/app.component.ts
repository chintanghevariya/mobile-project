import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private storage: Storage,
    private _location :Location
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.storage.set("users", []);
    await this.storage.set("restaurants", []);
  }

  goBack():void{
    this._location.back()
  }

}
