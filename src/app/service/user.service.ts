import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  dictUsers: { [name: string]: string } = {};

  constructor(private http: HttpClient, private requestService: RequestService) { }
  getUsers() {
    return this.dictUsers;
  }
  // getUser(userID: string): Observable<string> {
  //   console.log(this.dictUsers);
  //   if (this.dictUsers[userID]) {
  //     return of(this.dictUsers[userID]);
  //   } else {
  //     return this.addUser(userID).pipe((result: string) => { this.dictUsers[userID] = result; return result; });
  //   }
  // }
  addUser(user: string): Observable<string> {
    return this.http.get<string>(this.requestService.url + 'user/' + user).pipe(result => {
      return result;
    });
  }
}
