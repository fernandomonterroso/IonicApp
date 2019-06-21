import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, identity } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Team } from '../models/team';
import { Token } from '@angular/compiler';

@Injectable()
export class TeamService {

  endpoint:any = environment.endpoint;
  public token;
  public identity2;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.token = _userService.getToken();

  }
  
  private extractData(res: Response){
    return res || [] || {};
  }

 

  AddTeam(tokend, team: Team) : Observable<any>{
    this.identity2 = JSON.parse(localStorage.getItem('identity'));
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',tokend).set('teamManager',this.identity2._id);
    let params = JSON.stringify(team);
    return this._http.post(this.endpoint + 'api/v1/teams/create', params, { headers: headers })
    
  }
}
