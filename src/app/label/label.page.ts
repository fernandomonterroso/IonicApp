import { LabelService } from './../services/label.service';
import { Label } from './../models/label.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CreateLabelComponent, EditLabelComponent } from '../modals/index';
@Component({
	selector: 'app-label',
	templateUrl: './label.page.html',
	styleUrls:
		[
			'./label.page.scss'
		],
	providers:
		[
			UserService,
			LabelService
		]
})
export class LabelPage implements OnInit {
	public token;
	public labels: Label[];
	constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private router: Router, private _userService: UserService, private _labelService: LabelService) {
		this.token = _userService.getToken();
	}

	ngOnInit() {
		this.getLabels();
	}

	getLabels() {
		this._labelService.getLabels(this.token).subscribe(async res => {
			if (res.labels) {
				this.labels = res.labels;
				console.log(this.labels);
			} else {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500,
					closeButtonText: 'Close',
					showCloseButton: true
				});
				await toast.present();
			}
		});
	}

	logOut() {
		localStorage.clear();
		this.router.navigate([
			'/login'
		]);
	}

	async createLabel() {
		const modal = await this.modalCtrl.create({
			component: CreateLabelComponent
		});

		return await modal.present();
	}

	async editLabel(id) {
		let modal = await this.modalCtrl.create({
			component: EditLabelComponent,
			componentProps:
				{
					id: id
				}
		});
		return await modal.present();
	}
}
