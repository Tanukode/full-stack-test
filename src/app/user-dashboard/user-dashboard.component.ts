import { Component, OnInit } from '@angular/core';
import { GetUsersService, UserData } from '../get-users.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  updateForm: FormGroup;
  updateSubmit: boolean = false;

  createForm: FormGroup;
  createSubmit: boolean= false;

  res: UserData[] | undefined;
  headers: string[] = [];
  error: any;

  showUsers: boolean = true;

  singleUser: UserData | undefined;  
  newUser:UserData|undefined;

  constructor(private userService: GetUsersService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],      
    },{});
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],      
    },{});

  }



  ngOnInit() {
  }

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
    this.createSubmit = true;
    if(!this.createForm.valid){
      return;
    }
    this.userService.InsertUser(userName, userMail, userPassword)
      .subscribe(data => {
        for (let item of data) {
          console.log("agregado usuario con id" + item.id);
        }
      });
  }
  UpdateUser(userId: string, userName: string, userMail: string, userPassword: string) {
    this.updateSubmit = true;
    if(!this.updateForm.valid){
      return;
    }
    this.userService.UpdateUser(userId, userName, userMail, userPassword)
      .subscribe(data => {
        console.log("modified user")
      })
  }


}
