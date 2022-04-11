import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.page.html',
  styleUrls: ['./select-location.page.scss'],
})
export class SelectLocationPage implements OnInit {

  @Input() onSelect: (location: any) => void;
  @Input() toggleModal: () => void;

  address: string = "";
  locations: any[] = [];

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
  }

  async handleLocations(newAddress: string) {
    this
      .mapService
      .getLocationsByName(newAddress)
      .subscribe(data => {
        if (data.predictions) {
          this.locations = data.predictions;
        }
      });
    this.address = newAddress;
  }

}
