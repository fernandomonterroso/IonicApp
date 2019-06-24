import { Refresher } from 'ionic-angular';
import { LabelService } from './../services/label.service';
import { Label } from './../models/label.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
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
	constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private router: Router, private _userService: UserService, private _labelService: LabelService) {
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
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getLabels();
	}

	async editLabel(label) {
		let modal = await this.modalCtrl.create({
			component: EditLabelComponent,
			componentProps:
				{
					label: label
				}
		});
		await modal.present();
		const data = await modal.onDidDismiss();
		if (data.data !== undefined) this.getLabels();
	}

	async deleteLabel(id) {
		this._labelService.deleteLabel(id, this.token).subscribe(async res => {
			if (res.message) {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500,
					closeButtonText: 'Cerrar',
					showCloseButton: true
				});
				this.Loader('Cargando...', 2500);
				await toast.present().then(() => {
					this.getLabels();
				});
			}
		});
	}

	async Loader(message: string, duration: number) {
		const loading = await this.loadingCtrl.create({
			message: message,
			duration: duration
		});
		await loading.present();
	}

	doRefresh(e) {
		this.getLabels();
		setTimeout(() => {
			e.target.complete();
		}, 2500);
	}
}
