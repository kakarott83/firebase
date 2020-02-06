import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-verfify-email',
  templateUrl: './verfify-email.component.html',
  styleUrls: ['./verfify-email.component.css']
})
export class VerfifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
