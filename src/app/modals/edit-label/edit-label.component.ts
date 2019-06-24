import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
	selector: 'app-edit-label',
	templateUrl: './edit-label.component.html',
	styleUrls:
		[
			'./edit-label.component.scss'
		]
})
export class EditLabelComponent implements OnInit {
	public id;
	constructor(private navParams: NavParams) {
		this.id = this.navParams.get('id');
		console.log(this.id);
	}

	ngOnInit() {}
}
