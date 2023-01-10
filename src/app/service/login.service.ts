import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { RequestService } from './request.service';
const httpOptions: any = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean = false;


  constructor(private http: HttpClient, private requestService: RequestService, private alertService: AlertService) { }
  login(username: string, password: string): Observable<String> {
    return this.http.post<{ email: string; expiry: Int32Array; id: string; accessToken: string; username: string; message: string }>(this.requestService.url + "auth/signin", { username: username, password: password }).pipe(map(
      (response) => {
        if (response.username) {
          localStorage.setItem('user', JSON.stringify({
            id: response.id,
            username: username,
            email: response.email,
            token: response.accessToken,
            expiry: new Date().getTime() + (1000 * 600) // 10minutes
          }));
          localStorage.setItem('id_token', response.accessToken);
          localStorage.setItem('expires_at', (new Date().getTime() + (1000 * 3)).toString());
          return "connected";
        }
        else {
          return response.message;
        }
      },

    ), catchError((err) => {
      return of(err.error.message)
    }));
  }

  getUser() {
    const itemString = localStorage.getItem('user');
    if (new Date().getTime() > (JSON.parse(itemString || '{}')).expiry) {
      this.disconnect();
      return null;
    }

    // localStorage.removeItem('user');
    return JSON.parse(localStorage.getItem('user') || '{}').username || '';
  }





  getUserId() {
    const itemString = localStorage.getItem('user');
    if (new Date().getTime() > (JSON.parse(itemString || '{}')).expiry) {
      this.disconnect();
      return null;
    }

    // localStorage.removeItem('user');
    return JSON.parse(localStorage.getItem('user') || '{}').id || '';
  }
  disconnect() {
    localStorage.removeItem('user');
    this.alertService.warning("Vous avez été déconnecté");
  }
}
