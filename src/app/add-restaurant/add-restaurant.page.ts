import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant/restaurant.service';
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  constructor(private restaurantService: RestaurantService,
              private router :Router) { }

  ngOnInit() {
  }
  success:string=''
  error:string=''
  name:string=''
  street: string=''
  city: string=''
  zipCode: string=''
  geo:{
    lat:'',
    lng:''
  }
  description: string=''
  tags:[]

  addRestaurant(){
    console.log(this.description);
    
    const geo = {lat:1,lng:1}
    this.restaurantService
      .createRestaurant(this.name, this.description, this.tags, geo,this.city,this.zipCode,this.street)
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

  cancel(){
    this.router.navigateByUrl('/list')
  }
}
