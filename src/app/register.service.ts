import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = 'http://localhost:8080/api/auth/signup';
  constructor(private http: HttpClient) { }
  register(username: string, password: string, email: string): Observable<boolean> {
    return this.http.post<any>(this.url, { username: username, password: password, email: email }).pipe(map(
      (response) => {
        console.log(response);
        
        return true
        
      },
    
    ),catchError(() => {return of(false)}));
  }
}
