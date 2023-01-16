import { Injectable, isDevMode } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // make url 'http://localhost:8080/api/' when dev mode and 'https:share-api.clement-lefevre.fr' when prod mode
  url = isDevMode() ? 'http://localhost:8080/api/' : 'https://share-api.clement-lefevre.fr/api/';
  constructor() { }

}
