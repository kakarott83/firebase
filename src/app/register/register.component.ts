import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myLoginForm: FormGroup | undefined;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.myLoginForm = new FormGroup({
      firstname: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

}
