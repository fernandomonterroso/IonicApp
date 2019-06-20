import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getStatus() : boolean{
    if(localStorage.getItem('token') !== null){
      return true;
    }else{
      return false;
    }
  }
}
