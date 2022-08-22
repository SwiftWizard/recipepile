import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService, SelectItemGroup } from 'primeng/api';
import { Observable } from 'rxjs';
import { IngredientManagerComponent } from 'src/app/ingredient-manager/ingredient-manager.component';
import { RecipeService } from 'src/app/services/recipe.service';
import { CategoryService } from '../../services/category.service';
import { RecipeImageUploadComponent } from '../recipe-image-upload/recipe-image-upload.component';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  @ViewChild(RecipeImageUploadComponent)
  private recipeImgUpload: RecipeImageUploadComponent | undefined;

  @ViewChild(IngredientManagerComponent)
  private ingredientManager: IngredientManagerComponent | undefined;

  newRecipeForm: FormGroup;

  text: string = "";

  public categories$: Observable<SelectItemGroup[]> | null = null;

  constructor(private formBuilder: FormBuilder,  private categoryService: CategoryService, private recipeService: RecipeService, private router: Router, private messageService: MessageService) {
    this.newRecipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category: [[], [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      source: [''],
      prepTime: [, [Validators.required, Validators.min(1), Validators.max(180)]],
      servings: [, [Validators.required, Validators.min(1), Validators.max(50)]],
      article: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesForSelection();
  }

  submitRecipe(){
    if(!this.newRecipeForm.invalid && this.newRecipeForm.touched){
        this.recipeService.newRecipe({
          title: this.title?.value,
          categories: this.category?.value,
          description: this.description?.value,
          source: this.source?.value,
          timeNeeded: this.prepTime?.value,
          servings: this.servings?.value,
          article: this.article?.value,
          ingredients: this.ingredientManager?.getIngredients(),
          images: this.recipeImgUpload?.uploadImagesAndReturnUrls(),
          recipeId: -1,
          author: undefined,
          url: "" 
        });
    }
  }

  get title(){
    return this.newRecipeForm.get("title");
  }

  get category(){
    return this.newRecipeForm.get("category");
  }

  get description(){
    return this.newRecipeForm.get("description");
  }

  get source(){
    return this.newRecipeForm.get("source");
  }

  get prepTime(){
    return this.newRecipeForm.get("prepTime");
  }

  get servings(){
    return this.newRecipeForm.get("servings");
  }

  get article(){
    return this.newRecipeForm.get("article");
  }
}
