import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { RestaurantService } from '../services/restaurant/restaurant.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  allRestaurant: any = []
  constructor(
    private RestService: RestaurantService,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) { }

  ionViewDidEnter() {
    this.loader();
  }

  ngOnInit() {
    this.loader()
  }
  async loader(){
     this.allRestaurant = await this.RestService.getAllRestaurants()
  }

  presentAllRestaurantActionSheet = async () => {
    const actionSheet = await this.actionSheetController.create({
      header: "Actions",
      buttons: [
        {
          text: "Add Restaurant",
          handler: () => {
            this.navigateToAddRestaurant()
          }
        },
        {
          text: "Filter",
          handler: () => {
            this.navigateToFilter()
          }
        }
      ]
    });
    await actionSheet.present();
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

  async removeRestaurant(id) {
    await this.RestService.deleteRestaurantById(id);
    this.allRestaurant = this.allRestaurant.filter(restaurant => {
      return restaurant.id !== id
    });
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
