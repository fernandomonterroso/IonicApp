import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-edit-team',
	templateUrl: './edit-team.component.html',
	styleUrls:
		[
			'./edit-team.component.scss'
		],
	providers:
		[
			TeamService,
			UserService
		]
})
export class EditTeamComponent implements OnInit {
	public token;
	public team: Team;

	constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _teamService: TeamService, private _userService: UserService) {
		this.team = this.navParams.get('team');
		this.token = this._userService.getToken();
	}

	ngOnInit() {}

	async update() {
		if (this.team.description == '') {
			let toast = await this.toastCtrl.create({
				message: 'Necesita llenar todos los campos',
				duration: 2500,
				closeButtonText: 'Cerrar',
				showCloseButton: true
			});
			await toast.present();
		} else {
			this._teamService.editTeam(this.team, this.token).subscribe(async res => {
				if (res.team) {
					let toast = await this.toastCtrl.create({
						message: 'Equipo editado exitosamente',
						duration: 2500,
						closeButtonText: 'Cerrar',
						showCloseButton: true
					});
					await toast.present().then(() => {
						this.modalCtrl.dismiss({ E: 1 });
					});
				} else {
					let toast = await this.toastCtrl.create({
						message: res.message,
						duration: 2500,
						closeButtonText: 'Cerrar',
						showCloseButton: true
					});
					await toast.present();
				}
			});
		}
	}

	cancel() {
		this.modalCtrl.dismiss();
	}
}
