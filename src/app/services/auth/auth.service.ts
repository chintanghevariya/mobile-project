import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  ) { }

  public async loginUser(email: string, password: string): Promise<any> {
    const temp = await Storage.get({key:"users"});
    let allUsers = temp.value?JSON.parse(temp.value):[]
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
    let temp = await Storage.get({key:"users"});
    let allUsers = temp.value ? JSON.parse(temp.value) : []
    if (allUsers === null || allUsers === undefined) {
      allUsers = [];
    }
    const userWithSameEmail = allUsers.find(user => user.email === email);
    if (userWithSameEmail !== undefined) {
      throw "User with same email already exists";
    }
    if (password.length < 3) {
      throw "Password must be of 3 letters in length";
    }
    allUsers.push({
      email, password, firstName, lastName
    });
    await Storage.set({key:"users", value:JSON.stringify(allUsers)});
    return true;
  }

}
