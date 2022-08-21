import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DataWithMessages } from 'src/app/model/data-with-messages';
import { RecipeThick } from 'src/app/model/recipe-thick.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  recipe?: RecipeThick;

  constructor(private activetedRoute: ActivatedRoute, private recipeService: RecipeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      this.loadRecipe(params["id"]);
    });
  }

  loadRecipe(recipeId?: number){
    if(recipeId){
      this.recipeService.getRecipe(recipeId).subscribe({
        next: data => this.handleRecipeFetchSuccess(data),
        error: () => this.handleRecipeFetchFail()
      });
    }
  }

  handleRecipeFetchSuccess(data: any){
    console.log(data)
    this.recipe = data.data;
    this.messageService.addAll(data.messages.map(function(msgString :string){
      return {
        severity: 'info',
        summary: msgString
      }
    }));
  }

  handleRecipeFetchFail(){
    this.messageService.add({
      severity: "warn",
      summary: "Ups.. failed to obtain recipe"
    });
  }

}
