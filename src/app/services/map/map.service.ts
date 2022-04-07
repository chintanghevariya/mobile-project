import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTOCOMPLETE_API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const PLACE_DETAIL_API_URL =
    "https://maps.googleapis.com/maps/api/place/details/json";
const token = "AIzaSyAD3HNAwZ_A5ShqokH6RP-B8Nn5S2TTlkc";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public async getLocationsByName(name: string): Promise<any> {
    try {
      if (name === undefined || name === null) {
          return [null, null];
      }
      if (typeof name !== "string") {
          throw new Error("Name parameter must be a string");
      }
      if (name.trim() === "") {
          return [null, null];
      }
      if (name.length < 5) {
          return [null, null];
      }
      const request = await this.httpClient.get(
          AUTOCOMPLETE_API_URL + `?input=${name}&key=${token}`
      );
      return [request, null];
    } catch (e) {
        return [null, e.message];
    }
  }

  public async getLocationDetails(locationId) {
    try {
      if (locationId === undefined || locationId === null) {
          return [null, null];
      }
      if (locationId.trim() === "") {
          return [null, null];
      }
      const request = await this.httpClient.get(
          PLACE_DETAIL_API_URL + `?place_id=${locationId}&key=${token}`
      );
      return [request, null];
    } catch (err) {
      console.error(err);
      return [null, err.message];
    }
}

}
