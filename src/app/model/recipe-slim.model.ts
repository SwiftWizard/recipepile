import { Category } from "./category";
import { UserSlimInfo } from "./user-slim-info";

export interface RecipeSlim {
    recipeId: number;
    title: string;
    description: string;
    timeNeeded: number;
    source?: string;
    url?: any;
    servings?: number;
    author?: UserSlimInfo;
    images?: string[];
    categories?: Category[];
}
