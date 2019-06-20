import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authS: AuthService,private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    if(this.authS.getStatus() === true){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
    //navega
   
  }
}
