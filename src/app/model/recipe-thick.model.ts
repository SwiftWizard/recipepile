import { NotExpr } from "@angular/compiler";
import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { UserSlimInfo } from "./user-slim-info";

export interface RecipeThick {
    recipeId: number;
    title: string;
    description: string;
    timeNeeded: number;
    source?: string;
    url?: any;
    article?: string,
    servings?: number;
    author?: UserSlimInfo;
    images?: string[];
    categories?: Category[];
    ingredients?: Ingredient[];
}
