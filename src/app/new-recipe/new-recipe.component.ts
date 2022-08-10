import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  newRecipeForm: FormGroup;

  text: string = "";

  public categories$: Observable<SelectItemGroup[]> | null = null;

  constructor(private formBuilder: FormBuilder,  private categoryService: CategoryService) {
    this.newRecipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category: [[], [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      source: [''],
      prepTime: [, [Validators.required, Validators.min(1), Validators.max(180)]],
      servings: [, [Validators.required, Validators.min(1), Validators.max(50)]],
      noteTitle: ['', [Validators.required]],
      noteText: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesForSelection();
    console.log(this.newRecipeForm.get("noteText"));
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

  get noteTitle(){
    return this.newRecipeForm.get("noteTitle");
  }
}
