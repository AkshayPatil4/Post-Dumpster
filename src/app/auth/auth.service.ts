import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = true;
  private token: string;
  private tokenTimer: any;
  private authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getauthStatuslistner() {
    return this.authStatusListner.asObservable();
  }
  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn: number }>('http://localhost:3000/api/user/login', authData)
      .subscribe((respons) => {
        const token = respons.token;
        this.token = token;
        if (token) {
          const expiresInDuration = respons.expiresIn;
         this.setAuthtimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration *1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthuser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now  = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthtimer(expiresIn /1000);
      this.authStatusListner.next(true);
    }

  }

  logout(){
    this.token = null;
    this.isAuthenticated= false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    
  }

  private setAuthtimer(duration: number){
    console.log("setting timer " + duration);
    this.tokenTimer =setTimeout(()=>{
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData( token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.clear();
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
