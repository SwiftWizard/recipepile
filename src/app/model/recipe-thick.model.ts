import { NotExpr } from "@angular/compiler";
import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Note } from "./note";
import { UserSlimInfo } from "./user-slim-info";

export interface RecipeThick {
    recipeId: number;
    title: string;
    description: string;
    timeNeeded: number;
    source?: string;
    url?: any;
    note?: Note;
    servings?: number;
    author?: UserSlimInfo;
    images?: string[];
    categories?: Category[];
    allStuffNeeded?: Ingredient[];
}
