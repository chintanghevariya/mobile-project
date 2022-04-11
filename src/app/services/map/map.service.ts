import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const AUTOCOMPLETE_API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const PLACE_DETAIL_API_URL =
    "https://maps.googleapis.com/maps/api/place/details/json";
const token = "AIzaSyDaoWjKXa_gVe58W5pX8-JPcuxKT9nyce0";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getLocationsByName(name: string): Observable<any> {
    if (name.length < 3) {
      return of({});
    }
    const url = `http://localhost:4000/name/${name}`;
    return this.httpClient.get<any>(url);
  }

  public getLocationDetails(locationId: string): Observable<any> {
    const url = `http://localhost:4000/place/${locationId}`
    return this.httpClient.get<any>(url);
  }

}
