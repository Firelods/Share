import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url = 'http://localhost:8080/api/';
  constructor() { }

}
