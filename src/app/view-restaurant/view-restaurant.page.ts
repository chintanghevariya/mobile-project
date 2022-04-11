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
  address:string
  location: any = {}
  tag : String = ''
  rating:Number = 3
  temp:any
  constructor(private RestService : RestaurantService){ 

  }

  url = new URLSearchParams(window.location.search)
  restaurantId = Number(this.url.get('id'))
  async ngOnInit(){
    this.restaurantList = await this.RestService.getRestaurantById(this.restaurantId)
    console.log(this.restaurantList);
    
    this.name = this.restaurantList.restaurantName
    this.address = this.restaurantList.address
    this.description = this.restaurantList.description
  }

  goToLocation(){

  }

  handleSave(){

    // this.RestService.editRestaurant(this.restaurantId, )
  }

}
