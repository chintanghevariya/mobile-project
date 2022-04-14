import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  value: string = "";
  restaurants: any = [];
  currentTagValue: string = "";
  tags = []

  constructor(
    private restaurantService: RestaurantService,
    private actionSheetController: ActionSheetController,
    private router:Router
  ) { }

  ngOnInit() {
  }

  search() {
    this
      .restaurantService
      .searchRestaurants(this.value, this.tags)
      .then(data => {
        console.log(data);
        this.restaurants = data;
        console.log("Here");
      })
      .catch(err => {
        console.error(err);
      })
  }

  presentRestaurantActionSheet = async (itemId) => {
    const actionSheet = await this.actionSheetController.create({
      header: "Actions",
      buttons: [
        {
          text: "View",
          handler: () => {
            this.navigateToViewRestaurant(itemId);
          }
        },
        {
          text: "Edit",
          handler: () => {
            this.navigateToEditRestaurant(itemId);
          }
        },
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            this.removeRestaurant(itemId)
          }
        }
      ]
    });
    await actionSheet.present();
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

  async removeRestaurant(id) {
    await this.restaurantService.deleteRestaurantById(id);
    this.restaurants = this.restaurants.filter(restaurant => {
      return restaurant.id !== id
    });
  }

}
