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


  constructor(private http: HttpClient, private requestService: RequestService) { }
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.requestService.url + "auth/signin", { username: username, password: password }).pipe(map(
      (response) => {
        console.log(response);
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
          console.log("connected");
          return true
        }
        else {
          return false;
        }
      },

    ), catchError(() => { return of(false) }));
  }

  getUser() {
    const itemString = localStorage.getItem('user');
    if (new Date().getTime() > (JSON.parse(itemString || '{}')).expiry) {
      console.log("expired");
      localStorage.removeItem('user');
      return null;
    }

    // localStorage.removeItem('user');  
    return JSON.parse(localStorage.getItem('user') || '{}').username || '';
  }





  getUserId() {
    const itemString = localStorage.getItem('user');
    if (new Date().getTime() > (JSON.parse(itemString || '{}')).expiry) {
      localStorage.removeItem('user');
      return null;
    }

    // localStorage.removeItem('user');  
    return JSON.parse(localStorage.getItem('user') || '{}').id || '';
  }

}
