import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserDto} from '../user-dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {

  changeUserForm: FormGroup;
  allRoles = ['Admin', 'User'];
  users: UserDto[];
  currentUser: UserDto;
  showRedStatusToggle = false;
  showBlueStatusToggle = true;
  status = ['Active', 'Inactive'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('UserList'));
    this.currentUser = this.getUserById(Number(this.route.snapshot.params.id));
    console.log(this.currentUser);
    this.changeUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      role: ['', Validators.required]
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.changeUserForm.controls[controlName].hasError(errorName);
  }

  getUserById(id: number){
    return this.users.find(user => user.id === id);
  }

  changeUser() {
    this.currentUser.firstName = this.changeUserForm.get('firstName').value;
    this.currentUser.lastName = this.changeUserForm.get('lastName').value;
    this.currentUser.role = this.changeUserForm.get('role').value;
    this.users.splice(this.currentUser.id - 1, 1);
    this.users.push(this.currentUser);
    localStorage.setItem('UserList', JSON.stringify(this.users));
  }

  onStatusToggle() {
    if (this.showBlueStatusToggle === true) {
      this.showBlueStatusToggle = false;
      this.showRedStatusToggle = true;
    } else {
      this.showBlueStatusToggle = true;
      this.showRedStatusToggle = false;
    }
    if (this.showRedStatusToggle === true) {
      this.changeUserForm.controls['firstName'].disable();
      this.changeUserForm.controls['lastName'].disable();
      this.changeUserForm.controls['role'].disable();
    } else {
      this.changeUserForm.controls['firstName'].enable();
      this.changeUserForm.controls['lastName'].enable();
      this.changeUserForm.controls['role'].enable();
    }
  }
}
