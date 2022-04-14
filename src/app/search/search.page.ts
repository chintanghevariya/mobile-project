import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  value: string;
  restaurants: any;

  constructor(
    private restaurantService: RestaurantService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  search() {
    this
      .restaurantService
      .searchRestaurants(this.value)
      .then(data => {
        // debugger;
        this.restaurants = data;
        console.log(data);
      })
      .catch(err => {
        alert("Maa chud gayi bhenchod");
        console.error(err);
      })
  }
  
  navigateToViewRestaurant(id:any){
    this.router.navigateByUrl(`/view-restaurant?id=${Number(id)}`)
  }
  navigateToEditRestaurant(id:any){
    this.router.navigateByUrl(`/edit-restuarant?id=${Number(id)}`)
  }

}
