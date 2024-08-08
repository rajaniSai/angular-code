import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from "../../../shared/services/user.service";
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)])
    })
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value)
        .then(response => {
          console.log("Response in component =>", response);
          if (response.status === 200 && response.success === true) {
            alert("User created successfully!");
            // Navigate or show success message
            // this.router.navigate(['/success']);
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }
}


