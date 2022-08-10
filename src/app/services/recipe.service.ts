import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwError as ObservableThrow } from 'rxjs';
import { of as ObservableOf } from 'rxjs';
import { DataWithMessages } from '../model/data-with-messages';
import { RecipeSlim } from '../model/recipe-slim.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  getTopRecipes(): Observable<DataWithMessages<RecipeSlim[], string[]>>{
    return this.http.get<DataWithMessages<RecipeSlim[], string[]>>('/api/public/recipes/top');
  }
}
