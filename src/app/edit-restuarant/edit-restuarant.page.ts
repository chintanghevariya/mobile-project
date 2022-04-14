import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map/map.service';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-restuarant',
  templateUrl: './edit-restuarant.page.html',
  styleUrls: ['./edit-restuarant.page.scss'],
})
export class EditRestuarantPage implements OnInit {

  success:string=''
  error:string=''
  url = new URLSearchParams(window.location.search)
  restaurantId = Number(this.url.get('id'))
  restaurant:any
  name:string=''
  address:string=''
  description:string=''
  currentTagValue:string=''
  geo={
    lat:1,lng:1
  }

  tags = []
  constructor(private RestService:RestaurantService,
              private router :Router,
              private mapService:MapService,
              private appComponent: AppComponent) { }

  
  
  async ngOnInit() {
    this.restaurant = await this.RestService.getRestaurantById(this.restaurantId)
    this.name = this.restaurant.restaurantName
    this.address = this.restaurant.address
    this.description = this.restaurant.description
    this.tags = this.restaurant.tags;
    this.geo = this.restaurant.geo;
    console.log(this.geo);
  }
  location: any = {}
  isSelectLocationModalOpen: boolean = false;

  toggleSelectLocationModel = () => {
    this.isSelectLocationModalOpen = !this.isSelectLocationModalOpen;
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

  removeTag = (tag:any) => {
    const index = this.tags.indexOf(tag)
    this.tags.splice(index,1)
  }

  setLocation = (location: any) => {
    this.location = location
    this.address = this.location.description
    this.isSelectLocationModalOpen = false;
  }

  async handleSave(){
    let geo = this.geo;
    if (this.location.place_id) {
      const { place_id } = this.location;
      const locationDetails = await this.mapService.getLocationDetails(place_id).toPromise();
      const { lat, lng } = locationDetails.result.geometry.location;
      geo = { lat, lng };
    }
    const details = {
      restaurantName: this.name,
      description: this.description,
      tags: this.tags,
      geo: geo,
      address: this.location.description || this.address
    }
    this.RestService
      .editRestaurant(this.restaurantId,details)
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
  // goBack():void{
  //   // this.router.navigateByUrl('/view-restaurant')
  //   this.appComponent.goBack()
  // }

}
