import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
})
export class ViewRestaurantPage implements OnInit {

  edit:Boolean = false
  restaurantList : any = []
  name : String = ''
  description : String = ''
  geo: any = {};
  street : String = ''
  zipCode : String = ''
  city : String = ''
  tag : String = ''
  rating:Number = 3
  temp:any
  constructor(private RestService : RestaurantService){ 

  }

  url = new URLSearchParams(window.location.search)
  restaurantId = Number(this.url.get('id'))
  async ngOnInit(){
    this.temp = await this.RestService.getRestaurantById(this.restaurantId)
    this.restaurantList.push(this.temp)
    this.name = this.temp.restaurantName
    this.street = this.temp.street
    this.city = this.temp.city
    this.description = this.temp.description
    this.zipCode = this.temp.zipCode
    this.geo = this.temp.geo;
  }

  goToLocation(){

  }

  handleSave(){
    
    // this.RestService.editRestaurant(this.restaurantId, )
  }

}
