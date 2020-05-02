import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  public isAuthenticated: boolean;
  public user;

  constructor(private http: HttpClient, private router: Router, ) {
    this.isAuthenticated = !!window.localStorage.getItem('loginToken');
    // this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  login(email: string, password: string) {

    if (email === 'admin@mail.com') {       //PREPRAVITI U JSON

      return new Observable((o: Observer<any>) => {
        this.http.post('https://dummyendpoint.free.beeceptor.com', {
          'email': email,
          'password': password
        }).subscribe(
          (data: { token: string, user: User }) => {
            window.localStorage.setItem('loginToken', data.token);
            window.localStorage.setItem('user', JSON.stringify(data.user));

            this.user = data.user;
            this.isAuthenticated = true;

            o.next(data.token);
            return o.complete();
          },
          (err) => {
            return o.error(err);
          }
        );
      });
    } else {
      alert(`you must be admin to login. try: admin@mail.com - 12345`)
    }
  }

  public logout() {
    window.localStorage.removeItem('loginToken');
    window.localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.router.navigateByUrl('/login');
  }

  public getRequestHeaders() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
  }

}
