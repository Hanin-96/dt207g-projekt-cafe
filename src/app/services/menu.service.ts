import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  //Api för att hämta menyn

  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/menu";

  constructor(private http: HttpClient) { }

  getMenuData(): Observable<Menu[]> {

    //http anrop
    return this.http.get<Menu[]>(this.url);
  }
}
