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

export interface IIngredient {
    ingredient: string;
    quantity?: number;
    unit?: string;
}

export enum ETagType {
    INGREDIENT = 'ingredient',
    APPLIANCE = 'appliance',
    USTENSIL = 'ustensil',
}
export interface ITags {
    ingredients: string[];
    ustensils: string[];
    appliance: string[];
}

export interface ISearch {
    search: string;
    searchResult: IRecipe[];
    searchResultTags: ITags;
    reset: boolean;
}

export interface IPin {
    content: string;
    color: string;
    type: ETagType;
}
