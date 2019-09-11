import { Project } from './../../models/project.model';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { NavParams, ToastController, ModalController } from '@ionic/angular';

@Component({
	selector: 'app-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls:
		[
			'./edit-project.component.scss'
		],
	providers:
		[
			ProjectService,
			UserService
		]
})
export class EditProjectComponent implements OnInit {
	public token;
	public project: Project;

	constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _projectService: ProjectService, private _userService: UserService) {
		this.project = this.navParams.get('project');
		this.token = this._userService.getToken();
	}

	ngOnInit() {}

	async update() {
		if (this.project.name == '' || this.project.description == '') {
			let toast = await this.toastCtrl.create({
				message: 'Necesita llenar todos los campos',
				duration: 2500,
				closeButtonText: 'Cerrar',
				showCloseButton: true
			});
			await toast.present();
		} else {
			this._projectService.editProject(this.project, this.token).subscribe(async res => {
				if (res.project) {
					let toast = await this.toastCtrl.create({
						message: 'Proyecto editado exitosamente',
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
