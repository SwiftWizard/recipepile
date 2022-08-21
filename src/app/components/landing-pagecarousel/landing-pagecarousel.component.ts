import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataWithMessages } from '../../model/data-with-messages';
import { RecipeSlim } from '../../model/recipe-slim.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-landing-pagecarousel',
  templateUrl: './landing-pagecarousel.component.html',
  styleUrls: ['./landing-pagecarousel.component.scss']
})
export class LandingPagecarouselComponent implements OnInit {

  private recipePageUrl: string = "/recipes/recipe/";

  responsiveOptions;
  topRecipesWithMessages: Observable<DataWithMessages<RecipeSlim[], string[]>>;

  constructor(private recipeService: RecipeService, private router: Router) {
    this.topRecipesWithMessages =  this.recipeService.getTopRecipes();
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,  
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}

ngOnInit() {
    this.topRecipesWithMessages =  this.recipeService.getTopRecipes();
  }

goToRecipePage(recipeId: number){
  this.router.navigateByUrl(this.recipePageUrl + recipeId);
}
}
