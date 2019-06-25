import { Team } from './../models/team.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ToastController, ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { CreateModalTeamComponent, EditModalTeamComponent } from '../modals/index';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.page.html',
	styleUrls:
		[
			'./teams.page.scss'
		],
	providers:
		[
			TeamService,
			UserService
		]
})
export class TeamsPage implements OnInit {
	public token;
	public identity;
	public status;
	public modelTeam: Team;
	constructor(private router: Router, private _teamService: TeamService,
				 private toastCtrl: ToastController, private modalCtrl: ModalController,
				 private _userService: UserService, ) {
		this.token = this._userService.getToken();
		this.modelTeam = new Team('',[''],[{ users: '', rol: '' }]);
	}

	ngOnInit() {}


	async createTeam() {
		const modal = await this.modalCtrl.create({
			component: CreateModalTeamComponent
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		// if (data.data !== undefined) this.getTeams();
	}

	public getToken() {
		this.token = localStorage.getItem('token');
	}

	ss() {
		console.log('AAAAAAAAAAAAAAAA');
		this._teamService.AddTeam(this.token, this.modelTeam).subscribe(
			response => {
				console.log('AAAAAAAAAAAAAAAA' + response.team);
				if (response.team) {
					// this.getContactos();
					this.status = 'Ok';
					this.modelTeam.name = '';
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
				if (errorMessage != null) {
					this.status = 'error';
				}
			}
		);
	}

	async modalCreate() {
		// let modal = this._modalController.create(ModalTeamPage);
	}

	async agregarTeam() {
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

	ModalCreate() {}

	cerrar() {
		localStorage.clear();
		this.router.navigate([
			'/login'
		]);
	}
}
