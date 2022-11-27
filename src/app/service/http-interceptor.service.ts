import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token");
    console.log("INTERCEPTOR")
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("access-token", idToken),

      });
      cloned.headers.set("Access-Control-Allow-Origin", "http://share-api.clement-lefevre.fr")
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
