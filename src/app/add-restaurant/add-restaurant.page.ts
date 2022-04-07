import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  restaurantForm:{
    name:'',
    street:'',
    city:'',
    zipCode:'',
    geo:{
      lat:'',
      lng:''
    },
    description:'',
    tags:[]
  }

  addRestaurant(){
    
  }
}
