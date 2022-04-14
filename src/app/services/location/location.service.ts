import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Capacitor } from "@capacitor/core";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor() { }
    
    async askToTurnOnGPS(): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest: boolean) => {
                console.log(canRequest, "Can Request");
                if (canRequest) {
                    LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                        () => {
                            resolve(true);
                        },
                        error => { resolve(false); }
                    );
                }
                else { resolve(true); }
            });
        })
    }
    
    async checkGPSPermission(): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            if (Capacitor.isNative) {
                AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                    result => {
                        if (result.hasPermission) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    err => { alert(err); }
                );
            }
            else { resolve(true); }
        })
    }

    async requestGPSPermission(): Promise<string> {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest: boolean) => {
                if (canRequest) {
                    resolve('CAN_REQUEST');
                } else {
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                        .then(
                            (result) => {
                                if (result.hasPermission) {
                                    resolve('GOT_PERMISSION');
                                } else {
                                    resolve('DENIED_PERMISSION');
                                }
                            },
                            error => {
                                alert('requestPermission Error requesting location permissions ' + error);
                            }
                        );
                }
            });
        })
    }
}