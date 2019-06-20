import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page'
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ToastController } from '@ionic/angular';
import { Team } from '../models/team';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  providers: [TeamService, UserService]
})
export class TeamsPage implements OnInit {
  public token;
  public identity;
  public modelTeam: Team;
  constructor(private router: Router, private _teamService:TeamService,private toastCtrl: ToastController, private _userService: UserService) {
    this.token = this._userService.getToken();
    this.modelTeam = new Team ("","",[""],[{users: "", rol: ""}]);
  }
  

  ngOnInit() {
  }

  public getToken(){
     this.token = localStorage.getItem('token')
  }


  async addTeam(){
      this._teamService.AddTeam(this.token,this.modelTeam).subscribe(async res => {
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

  ModalCreate(){}

  cerrar(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
 
}


