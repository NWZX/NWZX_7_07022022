import { SearchEngine } from '../utils/searchEngine';
import { IPin, IRecipe, ISearch, ITags } from './Interface';

export class GlobalState {
    private _recipes: IRecipe[];
    private _tags: ITags;
    private _search: ISearch;
    private _pins: IPin[];

    constructor(data: IRecipe[]) {
        this._recipes = data;
        this._tags = this.tagsExtractor(data);
        this._pins = [];
        this._search = {
            search: '',
            searchResult: [],
            searchResultTags: {
                ingredients: [],
                appliance: [],
                ustensils: [],
            },
            reset: true,
        };
    }

    public setSearch = async (search: string, force = false, advancedMode = false): Promise<void> => {
        if (search !== this._search.search || force) {
            if (search.length === 0 && this._pins.length === 0) {
                this.resetSearch();
                return;
            }

            const pinContents = this._pins.map((v) => v.content).join(' ');
            const searchText = search.length > 0 ? search + ` ${pinContents}` : pinContents;
            const lAdvendedMode = this._pins.length > 0 ? true : advancedMode;

            const searchResult = await SearchEngine(this._recipes, searchText, lAdvendedMode);
            console.log(searchText, lAdvendedMode, searchResult);
            this._search = {
                search: search,
                searchResult: searchResult,
                searchResultTags: this.tagsExtractor(searchResult),
                reset: false,
            };
            document.dispatchEvent(new CustomEvent('gs_search', { detail: this._search }));
        }
    };

    public resetSearch = (): void => {
        this._search = {
            search: '',
            searchResult: [],
            searchResultTags: {
                ingredients: [],
                appliance: [],
                ustensils: [],
            },
            reset: true,
        };
        document.dispatchEvent(new CustomEvent('gs_search', { detail: this._search }));
    };

    public tagsExtractor = (recipes: IRecipe[]): ITags => {
        const tags: ITags = {
            ingredients: [],
            appliance: [],
            ustensils: [],
        };
        recipes.forEach((recipe) => {
            recipe.ingredients?.forEach((ingredient) => {
                const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
                if (!tags.ingredients.includes(lowerCaseIngredient)) {
                    tags.ingredients.push(lowerCaseIngredient);
                }
            });
            recipe.ustensils?.forEach((ustensil) => {
                const lowerCaseUstensil = ustensil.toLocaleLowerCase();
                if (!tags.ustensils.includes(lowerCaseUstensil)) {
                    tags.ustensils.push(lowerCaseUstensil);
                }
            });
            recipe.appliance &&
                !tags.appliance.includes(recipe.appliance.toLowerCase()) &&
                tags.appliance.push(recipe.appliance.toLowerCase());
        });
        return tags;
    };

    public get recipes(): IRecipe[] {
        return this._recipes;
    }
    public get tags(): ITags {
        return this._tags;
    }
    public get pins(): IPin[] {
        return this._pins;
    }
    public get search(): ISearch {
        return this._search;
    }

    public getTags = (type: 'appliance' | 'ustensils' | 'ingredients'): string[] => {
        return this._tags[type];
    };

    public addPins = (recipeId: IPin): void => {
        if (!this._pins.find((pin) => pin.content === recipeId.content)) {
            this._pins.push(recipeId);
            this.setSearch(this._search.search, true, true);
            document.dispatchEvent(new CustomEvent('gs_pins', { detail: this._pins }));
        }
    };

    public removePins = (recipeId: IPin): void => {
        const index = this._pins.findIndex((pin) => pin.content === recipeId.content);
        if (index > -1) {
            this._pins.splice(index, 1);
            this.setSearch(this._search.search, true, true);
            document.dispatchEvent(new CustomEvent('gs_pins', { detail: this._pins }));
        }
    };
}
