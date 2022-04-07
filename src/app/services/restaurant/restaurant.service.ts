import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private storage: Storage
  ) { }

  public async createRestaurant(
    restaurantName: string,
    description: string,
    tags: string[],
    geo: { lat: number, lng: number },
    address: string
  ) {
    const allRestaurants = await this.storage.get("restaurants");
    const restaurantWithSameName = allRestaurants.find(restaurant => restaurant.restaurantName === restaurantName);
    if (restaurantWithSameName !== undefined) {
      throw "Restaurant name is taken";
    }
    const id = allRestaurants.length + 1;
    allRestaurants.push({
      id, restaurantName, description, tags, geo, address
    });
    await this.storage.set("restaurants", allRestaurants);
  }

  public async getAllRestaurants() {
    return this.storage.get("restaurants");
  }

  public async getRestaurantById(id: number) {
    const restaurants = await this.getAllRestaurants();
    return restaurants.find(restaurant => restaurant.id === id);
  }

  public async editRestaurant(id: number, details: {
    restaurantName: string,
    description: string,
    tags: string[],
    geo: { lat: number, lng: number },
    address: string 
  }) {
    const restaurants = await this.getAllRestaurants();
    const restaurantIndex = restaurants.findIndex(restaurant => restaurant.id === id);
    if (restaurantIndex === undefined) {
      throw "Restaurant id is wrong";
    }
    restaurants[restaurantIndex] = {
      id,
      ...details
    };
    await this.storage.set("restaurants", restaurants);
    return restaurants[restaurantIndex];
  }

  public async deleteRestaurantById(id: number) {
    const allRestaurants = await this.getAllRestaurants();
    const restaurants = allRestaurants.filter(restaurant => restaurant.id !== id);
    await this.storage.set("restaurants", restaurants);
    return true;
  }

  public async searchRestaurants(searchValue: string) {
    const allRestaurants = await this.getAllRestaurants();
    const restaurants = allRestaurants.filter(restaurant => {
      restaurant.restaurantName.toLowerCase().includes(searchValue.toLowerCase()) ||
      restaurant.tags.findIndex(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
    });
    return restaurants;
  }
}
