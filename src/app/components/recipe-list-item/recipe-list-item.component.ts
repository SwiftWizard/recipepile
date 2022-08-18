import { Component, Input, OnInit } from '@angular/core';
import { RecipeSlim } from 'src/app/model/recipe-slim.model';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe: RecipeSlim | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
