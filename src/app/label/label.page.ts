import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-label',
	templateUrl: './label.page.html',
	styleUrls:
		[
			'./label.page.scss'
		]
})
export class LabelPage implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	logOut() {
		localStorage.clear();
		this.router.navigate([
			'/login'
		]);
	}
}
