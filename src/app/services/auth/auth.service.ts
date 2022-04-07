import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage
  ) { }

  public async loginUser(email: string, password: string): Promise<any> {
    const allUsers = await this.storage.get("users");
    const user = allUsers.find(user => user.email === email);
    if (user === undefined) {
      throw "Email is incorrect";
    }
    if (user.password !== password) {
      throw "Password is incorrect";
    }
    return user;
  }

  public async registerUser(
    email: string, password: string,
    firstName: string, lastName: string
  ): Promise<any> {
    let allUsers = await this.storage.get("users");
    if (allUsers === null || allUsers === undefined) {
      allUsers = [];
    }
    allUsers.push({
      email, password, firstName, lastName
    });
    await this.storage.set("users", allUsers);
    return true;
  }
}
