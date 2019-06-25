import { Component, OnInit } from '@angular/core';
import { Team } from './../../models/team.model';
import { UserService } from 'src/app/services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-modal-team',
  templateUrl: './create-modal-team.component.html',
  styleUrls: ['./create-modal-team.component.scss'],
  providers: [UserService, TeamService]
})
export class CreateModalTeamComponent implements OnInit {
  public token;
	public modelTeam: Team;
	constructor( private _teamService: TeamService,
				 private toastCtrl: ToastController, 
         private _userService: UserService,
         private modalCtrl: ModalController ) {
		this.token = this._userService.getToken();
		this.modelTeam = new Team('',[''],[{ users: '', rol: '' }]);
	}

  ngOnInit() {}

  async create() {
		this._teamService.AddTeam(this.token, this.modelTeam).subscribe(
			
			async res => {
				if (res.team) {
					let toast = await this.toastCtrl.create({
						message: 'Team successfully stored!',
						duration: 2500,
						color: 'dark',
						closeButtonText: 'Close',
						showCloseButton: true
					});
					await toast.present();
				}
			},
			async error => {
				let toast = await this.toastCtrl.create({
					message: error.error.message,
					duration: 2500,
					color: 'danger',
					closeButtonText: 'Close',
					showCloseButton: true
				});
				await toast.present();
			}
		);
  }
  
  async cancel() {
		this.modalCtrl.dismiss();
	}

}
