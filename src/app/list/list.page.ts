import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant/restaurant.service';
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
  async loader(){
     this.allRestaurant = await this.RestService.getAllRestaurants()
  }

  navigateToAddRestaurant(){
    this.router.navigateByUrl('/add-restaurant')
  }

  navigateToViewRestaurant(id:any){
    this.router.navigateByUrl(`/view-restaurant?id=${id}`)
  }
  navigateToEditRestaurant(id:any){
    this.router.navigateByUrl(`/edit-restuarant?id=${id}`)
  }

  navigateToFilter() {
    this.router.navigate(["/search"]);
  }
}
