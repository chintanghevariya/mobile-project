import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
  ) { }

  public async createRestaurant(
    restaurantName: string,
    description: string,
    tags: string[],
    geo: { lat: number, lng: number },
    address: string
  ) {
    const temp = await Storage.get({key:"restaurants"});
    let allRestaurants = temp.value?JSON.parse(temp.value):[]
    const restaurantWithSameName = allRestaurants.find(restaurant => restaurant.restaurantName === restaurantName);
    if (restaurantWithSameName !== undefined) {
      throw "Restaurant name is taken";
    }
    const id = allRestaurants.length + 1;
    allRestaurants.push({
      id, restaurantName, description, tags, geo, address
    });
    await Storage.set({key:"restaurants",value: JSON.stringify(allRestaurants)});
  }

  public async getAllRestaurants() {
    const restaurant = await Storage.get({key:"restaurants"});
    return JSON.parse(restaurant.value);
  }

  public async getRestaurantById(id: number) {
    const restaurants = await this.getAllRestaurants();

    return restaurants.find(restaurant => restaurant.id === id);
  }

  public async editRestaurant(id: number, details: {
    restaurantName: any,
    description: any,
    tags: any[],
    geo: { lat: any, lng: any },
    address: any 
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
    await Storage.set({key:"restaurants", value:JSON.stringify(restaurants)});
    return restaurants[restaurantIndex];
  }

  public async deleteRestaurantById(id: number) {
    const allRestaurants = await this.getAllRestaurants();
    const restaurants = allRestaurants.filter(restaurant => restaurant.id !== id);
    await Storage.set({key:"restaurants", value:JSON.stringify(restaurants)});
    return true;
  }

  public async searchRestaurants(searchValue: string, tags: string[] = []) {
    const allRestaurants: any[] = await this.getAllRestaurants();
    debugger;
    if (searchValue.trim() === "" && tags.length === 0) {
      return [];
    }
    const restaurants = allRestaurants.filter(restaurant => {
      debugger;
      if (searchValue.trim() !== "") {
        const nameMatches = restaurant.restaurantName.toLowerCase().includes(searchValue.toLowerCase())
        if (nameMatches) {
          return true;
        }
      }
      if (restaurant.tags === undefined) {
        return false;
      }
      for (const tag of tags) {
        const tagMatched = restaurant.tags.split(',').findIndex(addedTag => addedTag.toLowerCase().includes(tag.toLowerCase())) > -1;
        if (tagMatched) {
          return true;
        }
      }
      return false;
    });
    return restaurants;
  }
}
