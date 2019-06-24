import { Team } from './../models/team.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, identity } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class TeamService {
	endpoint: any = environment.endpoint;
	public token;
	public identity;

	constructor(private _http: HttpClient, private _userService: UserService) {
		this.token = _userService.getToken();
	}

	private extractData(res: Response) {
		return res || [] || {};
	}

	AddTeam(tokend, team: Team): Observable<any> {
		this.identity = JSON.parse(localStorage.getItem('identity'));
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', tokend).set('teamManager', this.identity._id);
		let params = JSON.stringify(team);
		return this._http.post(this.endpoint + 'api/v1/teams/create', params, { headers: headers });
	}
}
