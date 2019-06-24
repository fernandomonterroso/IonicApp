import { Label } from './../../models/label.model';
import { UserService } from './../../services/user.service';
import { LabelService } from './../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, ModalController } from '@ionic/angular';

@Component({
	selector: 'app-edit-label',
	templateUrl: './edit-label.component.html',
	styleUrls:
		[
			'./edit-label.component.scss'
		],
	providers:
		[
			LabelService,
			UserService
		]
})
export class EditLabelComponent implements OnInit {
	public token;
	public label: Label;

	constructor(private navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController, private _labelService: LabelService, private _userService: UserService) {
		this.label = this.navParams.get('label');
		this.token = this._userService.getToken();
	}

	ngOnInit() {}

	async update() {
		if (this.label.name == '' || this.label.color == '') {
			let toast = await this.toastCtrl.create({
				message: 'Necesita llenar todos los campos',
				duration: 2500,
				closeButtonText: 'Cerrar',
				showCloseButton: true
			});
			await toast.present();
		} else {
			this._labelService.editLabel(this.label, this.token).subscribe(async res => {
				if (res.label) {
					let toast = await this.toastCtrl.create({
						message: 'Label editado exitosamente',
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
