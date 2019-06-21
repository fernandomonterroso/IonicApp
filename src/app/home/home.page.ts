import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  LogOut(){
    console.log(localStorage.getItem('token'))
  }

  Profile(){
    this.router.navigate(['/profile'])
  }

  cerrar(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
