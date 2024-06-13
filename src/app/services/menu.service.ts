import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { DefaultResponse } from '../models/default-response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  //Api för att hämta menyn

  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/menu";

  private postUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/menu/dish";

  private deleteUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/menu/";

  private updateUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/menu/";

  constructor(private http: HttpClient) { }

  getMenuData(): Observable<Menu[]> {

    //http anrop
    return this.http.get<Menu[]>(this.url);
  }

  //lägg till ny maträtt
  postNewDish(newDish: Menu): Observable<Menu> {

    //Token för ändring av bokningar
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.post<Menu>(this.postUrl, newDish, { headers });
  }

  //Ta bort maträtt
  deleteFromMenu(dish_id: string): Observable<DefaultResponse> {

    //Token för radering av maträtter
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.delete<DefaultResponse>(this.deleteUrl + dish_id, { headers });
  }

  //Uppdatera maträtt
  updateFromMenu(dish_id: string, updatedDish: Menu): Observable<DefaultResponse> {
    //Token för radering av maträtter
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.put<DefaultResponse>(this.updateUrl + dish_id, updatedDish, { headers });

  }

}
