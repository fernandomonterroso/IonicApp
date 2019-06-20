import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Team } from '../models/team';
import { Token } from '@angular/compiler';

@Injectable()
export class TeamService {
  endpoint:any = environment.endpoint;
  public token;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private _http: HttpClient, private _userService: UserService) {
    this.token = _userService.getToken();
  }
  
  private extractData(res: Response){
    return res || [] || {};
  }

  AddTeam(token, team: Team) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(team);
    console.log(params)
    return this._http.post(this.endpoint + 'api/v1/teams/create', params, {headers:headers}).pipe(
      map(this.extractData)
    )
  }
}
