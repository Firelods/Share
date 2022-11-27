import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient, private requestService: RequestService) { }
  register(username: string, password: string, email: string): Observable<String> {
    return this.http.post<any>(this.requestService.url + "auth/signup", { username: username, password: password, email: email }).pipe(map(
      (response) => {
        console.log(response);

        return "connected";

      },

    ), catchError((err) => { return of(err.error.message) }));
  }
}
