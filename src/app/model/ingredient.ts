import { UnitOfMesure } from "./unit-of-mesure";

export interface Ingredient{
    ingredientName?: string,
    amount: number,
    unitOfMesure: UnitOfMesure
}