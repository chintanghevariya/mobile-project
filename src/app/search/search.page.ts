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
  currentTagValue: string = "";
  tags = []

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
