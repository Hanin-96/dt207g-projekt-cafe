import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginresponse } from '../models/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/login";

  constructor(private http: HttpClient) { }

  //Admin inloggning
  login(username: string, password: string): Observable<Loginresponse> {
    return this.http.post<Loginresponse>(this.url, {username, password});
  }
}
