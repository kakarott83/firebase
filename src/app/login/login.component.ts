import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myLoginForm: FormGroup | undefined;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.myLoginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

}
