import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { AppComponent } from '../app.component';
import { ReviewService } from '../services/review/review.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
})
export class ViewRestaurantPage implements OnInit {

  edit: Boolean = false
  name: String = ''
  description: String = ''
  geo: any = {
    lat: 1,
    lng: 1
  };
  address: String = ''
  tag: String = ''
  rating: number = 3;
  restaurant: any = {}
  comment: string = "";
  userName = localStorage.getItem('userName')
  allReviews :any

  constructor(private RestService: RestaurantService,
    private router: Router,
    private appComponent: AppComponent,
    private ReviewService: ReviewService,
    public toastController: ToastController
  ) {
  }
  url = new URLSearchParams(window.location.search)
  restaurantId = Number(this.url.get('id'))
  async ngOnInit() {
    this.restaurant = await this.RestService.getRestaurantById(this.restaurantId)
    this.name = this.restaurant.restaurantName
    this.address = this.restaurant.address
    this.description = this.restaurant.description
    this.geo = this.restaurant.geo;
  }

  submitReview() {
    this.ReviewService
      .addReview(this.restaurantId, this.userName, this.rating, this.comment)
      .then(async () => {
        const toast = await this.toastController.create({
          message: 'Your review has been added.',
          duration: 2000
        });
        toast.present();
      })
  }

  async getAllReview(){
    await this.ReviewService.allReview(this.restaurantId)
    .then((data)=>{
      this.allReviews = data
      console.log(this.allReviews);
      
    })
  }
  goToLocation() {
    this.router.navigate([`/directions/${this.geo.lat}/${this.geo.lng}`])
  }
  navigateToEditRestaurant(id: any) {
    this.router.navigateByUrl(`/edit-restuarant?id=${id}`)
  }

}
