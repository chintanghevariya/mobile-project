import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  allRestaurant : any = []
  constructor(private RestService : RestaurantService) { }

  ngOnInit() {
    this.loader()
  }
   async loader(){
     this.allRestaurant = await this.RestService.getAllRestaurants()
   }
}
