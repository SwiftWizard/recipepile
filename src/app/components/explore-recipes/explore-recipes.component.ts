import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { DataWithMessages } from 'src/app/model/data-with-messages';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['./explore-recipes.component.css']
})
export class ExploreRecipesComponent implements OnInit {

  recipePage: any;

  sortKey: string = "";

  sortOptions: SelectItem[];

  determinedSize: number = 0;

  size: any;

  constructor(private recipeSerivce: RecipeService, private messageService: MessageService) {
    this.onResize(undefined);
    this.sortOptions = [
      {label: 'Newest First', value: 'new'},
      {label: 'Most Popular First', value: 'popular'}
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let width = window.innerWidth;
    this.size = width;

    if(width < 995){
      this.determinedSize = width + 30;
    }
    else{
      this.determinedSize = Math.round(width - (width / 1.4));
    }
  }

  getRecipePage(categoryId?: number, page?: number, size?: number){
    this.recipeSerivce.getRecipes().subscribe({
      next: data => this.handleRecipesFetchSuccess(data),
      error: () => this.handleRecipesFetchFail()
    });
  }

  handleRecipesFetchSuccess(data: any){
    this.recipePage = data;
    this.messageService.addAll(data.messages.map(function(msgString :string){
      return {
        severity: 'info',
        summary: msgString
      }
    }));
  }

  handleRecipesFetchFail(){
    this.messageService.add({
      severity: "warn",
      summary: "Ups.. failed to obtain recipes"
    });
  }

  onSortChange() {
    if (this.sortKey == "new")
        this.sort(-1);
    else
        this.sort(1);
  }

  sort(order: number): void {
    let recipes = [...this.recipePage.data];
    recipes.sort((data1, data2) => {
        let value1 = data1.price;
        let value2 = data2.price;
        let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (order * result);
    });

    this.recipePage.data = recipes;
}

  ngOnInit(): void {
    this.getRecipePage();
  }
}
