/**
 * Object representation of a recipe
 */
export interface IRecipe {
    id: number;
    name: string;
    servings: number;
    ingredients: IIngredient[];
    time: number;
    description: string;
    appliance: string;
    ustensils: string[];
}

/**
 * Object representation of a ingredient
 */
export interface IIngredient {
    ingredient: string;
    quantity?: number;
    unit?: string;
}

/**
 * Enumuration of the different categories
 */
export enum ECategorieType {
    INGREDIENT = 'ingredients',
    APPLIANCE = 'appliances',
    USTENSIL = 'ustensils',
}

/**
 * Object representation of a category
 */
export interface ICategories {
    ingredients: string[];
    ustensils: string[];
    appliances: string[];
}

/**
 * Object representation of a search
 */
export interface ISearch {
    search: string;
    searchResult: IRecipe[];
    searchResultTags: ICategories;
    reset: boolean;
}

/**
 * Object representation of a pin
 */
export interface IPin {
    content: string;
    color: string;
    type: ECategorieType;
}
