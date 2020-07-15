import { Component, OnInit } from '@angular/core';
import {UserCrudService} from '../../service/user-crud.service';
import {UserDto} from '../user-dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  allRoles = ['* Role', 'Admin', 'User'];
  addUserForm: FormGroup;
  users: UserDto[];
  currentUser: UserDto;
  showAddUserForm = false;
  showDeleteUserForm = false;
  showRedStatusToggle = false;
  showBlueStatusToggle = true;
  showSetupBtn = true;
  hideSetupBtn: number = null;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserCrudService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.addUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addUserForm.controls[controlName].hasError(errorName);
  }

  loadData() {
    this.userService.getAllUsers().subscribe(data => {
      localStorage.setItem('UserList', JSON.stringify(data));
    });
    this.users = JSON.parse(localStorage.getItem('UserList'));
  }
  openAddUserPopup() {
    this.showAddUserForm = true;
  }

  closeAddUserPopup() {
    this.showAddUserForm = false;
  }

  addUser() {
    this.users = JSON.parse(localStorage.getItem('UserList'));
    this.currentUser = this.addUserForm.value;
    this.currentUser.id = this.users.length + 1;
    this.users.push(this.currentUser);
    localStorage.setItem('UserList', JSON.stringify(this.users));
    this.addUserForm.reset();
    this.showAddUserForm = false;
  }

  openDeleteUserPopup(id: number) {
    this.showDeleteUserForm = true;
    this.currentUser = this.getUserById(Number(id));
  }

  closeDeleteUserPopup() {
    this.showDeleteUserForm = false;
  }

  getUserById(id: number){
    return this.users.find(user => user.id === id);
  }

  getUsersByFirstName(firstName: string){
    return JSON.parse(localStorage.getItem('UserList')).filter(user => user.firstName.toLowerCase().includes(firstName.toLowerCase()));
  }

  deleteUser(id: number) {
    if (id !== -1) {
      const userList = JSON.parse(localStorage.getItem('UserList'));
      userList.splice(userList.find(user => user.id === id), 1);
      localStorage.setItem('UserList', JSON.stringify(userList));
      this.users = JSON.parse(localStorage.getItem('UserList'));
    }
    this.showDeleteUserForm = false;
  }

  goToUserSetup(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

  onSearchByFirstName(event: any) {
    console.log(event.target.value);
    this.users = this.getUsersByFirstName(event.target.value.toString());
    console.log(this.currentUser);
  }

  onStatusToggle(i: number) {
    if (this.showBlueStatusToggle === true) {
      this.showBlueStatusToggle = false;
      this.showRedStatusToggle = true;
      this.showSetupBtn = false;
    } else {
      this.showBlueStatusToggle = true;
      this.showRedStatusToggle = false;
      this.showSetupBtn = true;
    }
    this.hideSetupBtn !== i ? this.hideSetupBtn = i : this.hideSetupBtn = null;
  }
}
