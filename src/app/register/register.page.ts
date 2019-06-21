import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import {NavController, NavParams,ModalController} from 'ionic-angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string = "";
  username:string = "";
  email:string = "";
  password:string = "";
  constructor(public userService: UserService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async DoRegister(){
    if(this.name === "" || this.username === "" || this.email === "" || this.password === ""){
      let toast = await this.toastCtrl.create({
        message: 'You need to complete all fields',
        duration: 2500,
        closeButtonText: 'Close',
        showCloseButton: true
      })
      await toast.present();
    }else{
      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.userService.Register(user).subscribe(async res => {
        console.log(res)
        if(res.user){
          let toast = await this.toastCtrl.create({
            message: 'User successfully stored!',
            duration: 2500,
            closeButtonText: 'Close',
            showCloseButton: true
          })
          await toast.present();
        }else{
          let toast = await this.toastCtrl.create({
            message: res.message,
            duration: 2500,
            closeButtonText: 'Close',
            showCloseButton: true
          })
          await toast.present();
        }
      })
    }
  }

}
