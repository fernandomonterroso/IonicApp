import { Label } from './../models/label.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LabelService {
	endpoint: any = environment.endpoint;

	public headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private _http: HttpClient) {}

	private extractData(res: Response) {
		return res || [] || {};
	}

	public getLabels(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint + 'labels/', { headers: headers }).pipe(map(this.extractData));
	}

	public createLabel(label: Label, token): Observable<any> {
		let params = JSON.stringify(label);
		let headers = this.headers.set('Authorization', token);
		return this._http.post(this.endpoint + 'labels/', params, { headers: headers }).pipe(map(this.extractData));
	}

	public editLabel(label: Label, token): Observable<any> {
		let params = JSON.stringify(label);
		let headers = this.headers.set('Authorization', token);
		return this._http.put(this.endpoint + 'labels/' + label._id, params, { headers: headers }).pipe(map(this.extractData));
	}

	public deleteLabel(label, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.delete(this.endpoint + 'labels/' + label, { headers: headers }).pipe(map(this.extractData));
	}
}
