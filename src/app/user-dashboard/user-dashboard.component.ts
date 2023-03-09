import { Component } from '@angular/core';
import { GetUsersService, UserData } from '../get-users.service';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  res: UserData[] | undefined;
  headers: string[] = [];
  error: any;

  showUsers: boolean = true;

  singleUser: UserData | undefined;

  singleUserId = new FormControl();
  singleUserName = new FormControl();
  singleUserMail = new FormControl();
  singleUserPassword = new FormControl();

  newUserName = new FormControl();
  newUserMail = new FormControl();
  newUserPassword = new FormControl();


  constructor(private userService: GetUsersService, private authService: AuthService, private storageService: StorageService) { }

  ShowUsers() {
    this.userService.GetUsers().
      subscribe(data => {
        this.res = data;
        console.log(data);
      });
  }

  ShowSingleUser(userId: string) {
    this.userService.GetSingleUser(userId)
      .subscribe(data => {
        for (let item of data) {
          this.singleUser = item;
          this.singleUserName = new FormControl(this.singleUser.nombre_completo);
          this.singleUserId = new FormControl(this.singleUser.id);
          this.singleUserMail = new FormControl(this.singleUser.email);
          this.singleUserPassword = new FormControl(this.singleUser.password);
        }

      })
  }
  DeleteUser(userId: string) {
    this.userService.DeleteUser(userId)
      .subscribe(data => {
        console.log("eliminado usuario con id: " + userId);
      });
  }
  InsertUser(userName: string, userMail: string, userPassword: string) {
    this.userService.InsertUser(userName, userMail, userPassword)
      .subscribe(data => {
        for (let item of data) {
          console.log("agregado usuario con id" + item.id);
        }
      });
  }
  UpdateUser(userId: string, userName: string, userMail: string, userPassword: string) {
    this.userService.UpdateUser(userId, userName, userMail, userPassword)
      .subscribe(data =>{
        console.log("modified user")
      })
  }


}
