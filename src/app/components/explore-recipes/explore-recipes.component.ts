import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataWithMessages } from 'src/app/model/data-with-messages';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['./explore-recipes.component.css']
})
export class ExploreRecipesComponent implements OnInit {

  recipePageWithMessages$: Observable<DataWithMessages<any, string[]>> | undefined;

  constructor(private recipeSerivce: RecipeService) { }

  ngOnInit(): void {
    this.recipePageWithMessages$ = this.recipeSerivce.getRecipes();
  }

}
