import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient';

@Component({
  selector: 'app-ingredient-manager',
  templateUrl: 'ingredient-manager.component.html',
  styleUrls: ['./ingredient-manager.component.scss']
})
export class IngredientManagerComponent implements OnInit {

  numberOfIngredients: number = 0;

  private ingredientSubjects: Subject<any>[] = [];
  ingredients$: Observable<Ingredient>[] = [];

  ingredientForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.ingredientForm = formBuilder.group({
      ingredientName: ["", [Validators.required]],
      ingredientAmount: [, [Validators.required]],
      ingredientUoM: ["", [Validators.required]]
    });
  }

  getIngredients(): Ingredient[]{
    let result: Ingredient[] = [];
    this.ingredients$.forEach(ing => {
      ing.subscribe({
        next: value => {result.push(value)}
      })
    });

    result.forEach(val => console.log(val));

    return result;
  }

  addIngredient(){
    if(!this.ingredientForm.invalid && this.ingredientForm.touched){
      this.ingredientSubjects[this.numberOfIngredients] = new ReplaySubject();
      this.ingredientSubjects[this.numberOfIngredients].next(
        {
          ingredientName: this.ingredientName?.value,
          amount: this.ingredientAmount?.value,
          unitOfMeasure: this.ingredientUoM?.value
  
        }
      );
      this.ingredients$[this.numberOfIngredients] = this.ingredientSubjects[this.numberOfIngredients].asObservable();
      this.numberOfIngredients++;
    }
  }

  removeIngredient(ingredient: Observable<Ingredient>){
    let index = this.ingredients$.indexOf(ingredient);
    if(index > -1){
      this.ingredients$.splice(index, 1);
      this.numberOfIngredients--;
    }  
  }

  ngOnInit(): void {
  }

  get ingredientName(){
    return this.ingredientForm.get("ingredientName");
  }

  get ingredientAmount(){
    return this.ingredientForm.get("ingredientAmount");
  }

  get ingredientUoM(){
    return this.ingredientForm.get("ingredientUoM");
  }

}