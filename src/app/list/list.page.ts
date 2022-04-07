import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  allRestaurant: any = []
  constructor(private RestService: RestaurantService,private router:Router) { }

  ionViewDidEnter() {
    this.loader();
  }

  ngOnInit() {
    this.loader()
  }
  async loader() {
    this.allRestaurant = await this.RestService.getAllRestaurants()
  }

  navigateToAddResturant(){
    this.router.navigateByUrl('/add-restaurant')
  }
}
