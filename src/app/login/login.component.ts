import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetUsersService } from '../get-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: GetUsersService) { }
  
  username = new FormControl('');
  password = new FormControl('');

}
