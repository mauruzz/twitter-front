import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //genero el token
  public generateToken(loginData:any){
    console.log(loginData);
    return this.http.post(`${baserUrl}/generate-token`,loginData);
  }
  
  
  //Inicio sesión y guardo en el localStorage
  public loginUser (token : any) {
    localStorage.setItem('token', token);
  }

  public isLoggedIn () {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //Cierro sesión y elimino el localStorage
  public logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Obtengo token
  public getToken () {
    return localStorage.getItem('token');
  }

  public setUser (user : any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser () {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole () {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser () {
    return this.http.get(`${baserUrl}/current-user`);
  }


}
