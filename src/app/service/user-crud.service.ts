import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  users: UserDto[];

  constructor(
    public http: HttpClient
  ) {
  }

  getAllUsers() {
    return this.http.get<any>('./assets/data.json');
  }

  addUser(data: UserDto) {
    this.users = JSON.parse(localStorage.getItem('UserList'));
    this.users.push(data);
    return this.http.post<any>('./assets/data.json', data);
  }
}
