import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from '../services/map/map.service';
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private mapService: MapService
  ) { }

  ngOnInit() {
  }
  success: string = ''
  error: string = ''
  name: string = ''
  currentTagValue: string = "";
  geo: {
    lat: '',
    lng: ''
  }
  description: string = ''
  tags = []
  destinations = [];
  location: any = {}
  isSelectLocationModalOpen: boolean = false;

  toggleSelectLocationModel = () => {
    this.isSelectLocationModalOpen = !this.isSelectLocationModalOpen;
  }

  setLocation = (location: any) => {
    this.location = location
    this.isSelectLocationModalOpen = false;
  }

  async addRestaurant() {
    const { place_id } = this.location;
    const locationDetails = await this.mapService.getLocationDetails(place_id).toPromise();
    const { lat, lng } = locationDetails.result.geometry.location;
    const geo = { lat, lng };
    this.restaurantService
      .createRestaurant(
        this.name,
        this.description,
        this.tags,
        geo,
        this.location.description
      )
      .then(() => {
        this.success = "Logged in";
        this.error = "";
        this.router.navigateByUrl('/list')
      })
      .catch(err => {
        this.error = err;
        this.success = ""
      });
  }

  cancel() {
    this.router.navigateByUrl('/list')
  }

  addTag() {
    const tagExists = this.tags.findIndex(tag => {
      return tag.toLowerCase() === this.currentTagValue.toLowerCase();
    }) > -1;
    if (tagExists === false) {
      this.tags.push(this.currentTagValue);
      this.currentTagValue = ""
    }
  }
  removeTag(tag:any){
    const index = this.tags.indexOf(tag)
    this.tags.splice(index,1)
  }
}
