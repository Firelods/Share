import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import{LoginService} from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public loginService: LoginService, public router:Router){

  }
  canActivate(): boolean {
    if(this.loginService.getUser()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
