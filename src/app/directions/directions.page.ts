import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location/location.service';
import { MapService } from '../services/map/map.service';
import { Capacitor } from "@capacitor/core";
import { Geolocation } from '@capacitor/geolocation';
import { ActivatedRoute } from '@angular/router';
import { MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.page.html',
  styleUrls: ['./directions.page.scss'],
})
export class DirectionsPage implements OnInit {

  lat: any;
  lng: any;
  dLat: any;
  dLng: any;
  watchId: any;
  origin: any;
  showMap: boolean = false;
  directions?: google.maps.DirectionsResult;

  constructor(
    private locationService: LocationService,
    private directionsService: MapDirectionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dLat = params.lat;
      this.dLng = params.lng;
    })
    this.getMyLocation()
  }

  async getMyLocation() {
    const hasPermission = await this.locationService.checkGPSPermission();
    if (hasPermission) {
      if (Capacitor.isNativePlatform()) {
        const canUseGPS = await this.locationService.askToTurnOnGPS();
        this.postGPSPermission(canUseGPS);
      }
      else { this.postGPSPermission(true); }
    }
    else {
      const permission = await this.locationService.requestGPSPermission();
      if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
        if (Capacitor.isNativePlatform()) {
          const canUseGPS = await this.locationService.askToTurnOnGPS();
          this.postGPSPermission(canUseGPS);
        }
        else { this.postGPSPermission(true); }
      }
      else {
        console.log({
          text: 'User denied location permission'
        })
      }
    }
  }

  async postGPSPermission(canUseGPS: boolean) {
    if (canUseGPS) { this.watchPosition(); }
    else {
      console.log({
        text: 'Please turn on GPS to get location'
      })
    }
  }

  async watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        if (err) { console.log('err', err); return; }
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.origin = {
          lat: this.lat,
          lng: this.lng
        }
        this.showMap = true;
        this.clearWatch();
      })
    }
    catch (err) { console.log('err', err) }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
      this.getDirections();
    }
  }

  getDirections = () => {
    const origin = {
      lat: this.lat,
      lng: this.lng
    };
    const destination = {
      lat: Number(this.dLat),
      lng: Number(this.dLng)
    };
    const request = {
      destination,
      origin,
      travelMode: google.maps.TravelMode.DRIVING
    }
    this
      .directionsService
      .route(request)
      .pipe(map(response => response.result))
      .subscribe(result => {
        debugger;
        this.directions = result;
      })
  }

}
