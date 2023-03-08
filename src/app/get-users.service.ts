import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { single } from 'rxjs';

export interface UserData {
  id: string;
  nombre_completo: string;
  email: number;
  password: string;
}

@Injectable({ providedIn: 'root' })

export class GetUsersService {
  private getUsersUrl = 'http://127.0.0.1:3000/users/'
  constructor(private httpClient: HttpClient) { }

  GetUsers(){
    return this.httpClient.get<UserData[]>(this.getUsersUrl, {responseType:"json"});
  }
  GetSingleUser(userId:string){
    return this.httpClient.get<UserData[]>(this.getUsersUrl+userId, {observe:"body",responseType:"json"});
  }
  DeleteUser(userId:string){
    return this.httpClient.delete(this.getUsersUrl+userId);
  }
  UpdateUser(userId:string, userName:string, userMail:string, userPassword:string){
    return this.httpClient.put<UserData[]>(this.getUsersUrl+userId,{
      nombreCompleto: userName,
      email: userMail,
      password: userPassword
    });
  }
  InsertUser(userName:string, userMail:string, userPassword:string){
    return this.httpClient.post<UserData[]>(this.getUsersUrl, {
      nombreCompleto: userName,
      email: userMail,
      password: userPassword
    });
  }
}
