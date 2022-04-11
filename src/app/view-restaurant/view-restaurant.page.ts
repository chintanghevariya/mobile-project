import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
})
export class ViewRestaurantPage implements OnInit {

  edit:Boolean = false
  restaurantList : any = []
  name : String
  description : String
  address : String 
  zipcode : String
  city : String
  tag : String
  rating:Number = 3

  constructor(){ 

  }

  ngOnInit() {
  }

  goToLocation(){

  }

  handleSave(){

  }

}
