import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataWithMessages } from '../model/data-with-messages';
import { RecipeSlim } from '../model/recipe-slim.model';
import { RecipeThick } from '../model/recipe-thick.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = environment.backend.baseURL;

  private topRecipesUrl: string = "/api/public/recipes/top";
  private newRecipeUrl: string = "/api/manage/recipes/new";
  private allRecipesByCategory: string = "/api/public/recipes/all";

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
  }

  getTopRecipes(): Observable<DataWithMessages<RecipeSlim[], string[]>>{
    return this.http.get<DataWithMessages<RecipeSlim[], string[]>>(`${this.apiUrl}${this.topRecipesUrl}`);
  }

  getRecipes(categoryId?: number, page?: number, size?: number): Observable<DataWithMessages<any, string[]>> {
    return this.http.get<DataWithMessages<any, string[]>>(`${this.apiUrl}${this.allRecipesByCategory}`);
  }

  newRecipe(recipe: RecipeThick){
    let observableData = this.http.post<DataWithMessages<RecipeThick, string[]>>(`${this.apiUrl}${this.newRecipeUrl}`, recipe);
    
    observableData.subscribe({
      next: dataWmeesages => this.handleNewRecipeSuccess(dataWmeesages),
      error: () => this.handleNewRecipeFailed()
    });
  }

  handleNewRecipeSuccess(dataWmeesages: DataWithMessages<RecipeThick, string[]>){
    this.router.navigateByUrl(dataWmeesages.data?.url);
    this.messageService.addAll(dataWmeesages.messages!.map(function(msgString :string){
      return {
        severity: 'info',
        summary: msgString
      }
    }));
  }
  
  handleNewRecipeFailed(){
    this.messageService.add({
      severity: "warn",
      summary: "And unexpected error occured, failed to add new recipe"
    })
  }
}