import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	public token;
	endpoint: any = environment.endpoint;

	httpOptions = {
		headers:
			new HttpHeaders({
				'Content-Type': 'application/json'
			})
	};
	constructor(private http: HttpClient) {}

	private extractData(res: Response) {
		return res || [] || {};
	}

	public DoLogin(user): Observable<any> {
		let params = JSON.stringify(user);
		return this.http.post(this.endpoint + 'users/login', params, this.httpOptions).pipe(map(this.extractData));
	}

	public Register(user): Observable<any> {
		let params = JSON.stringify(user);
		return this.http.post(this.endpoint + 'users/sign-up', params, this.httpOptions).pipe(map(this.extractData));
	}

	public getToken() {
		return localStorage.getItem('token');
	}

	public getIdentity() {
		return localStorage.getItem('identity');
	}
}
