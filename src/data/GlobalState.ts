import { SearchEngine } from '../utils/searchEngine';
import { IPin, IRecipe, ISearch, ICategories, ECategorieType } from './Interface';

/**
 * Distibute/Manage data in the application
 */
export class GlobalState {
    private _recipes: IRecipe[];
    private _categories: ICategories;
    private _search: ISearch;
    private _pins: IPin[];

    constructor(data: IRecipe[]) {
        this._recipes = data;
        this._pins = [];
        this._search = {
            search: '',
            searchResult: [],
            searchResultTags: {
                ingredients: [],
                appliances: [],
                ustensils: [],
            },
        };
        this._categories = this.categoriesExtractor(data);
    }

    /**
     * Set the search value and generate the search result
     * @emits gs_search
     * @param search Search request text
     * @param force Force search even if the search text is the same
     * @param advancedMode Extend the search to the appliance and ustensils
     * @returns
     */
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
            this._search = {
                search: search,
                searchResult: searchResult,
                searchResultTags: this.categoriesExtractor(searchResult, true),
            };
            document.dispatchEvent(new CustomEvent('gs_search', { detail: this._search }));
        }
    };

    /**
     * Reset the search value
     * @emits gs_search_clear
     */
    public resetSearch = (): void => {
        if (this._search.search.length > 0 || this.search.searchResult.length > 0) {
            this._search = {
                search: '',
                searchResult: [],
                searchResultTags: {
                    ingredients: [],
                    appliances: [],
                    ustensils: [],
                },
            };
            document.dispatchEvent(new CustomEvent('gs_search_clear'));
        }
    };

    /**
     * Extract the categories from the recipes
     * @param recipes Array of recipes
     * @param excludePins Exclude the pins name if already in the `_pins` array
     * @returns
     */
    public categoriesExtractor = (recipes: IRecipe[], excludePins = false): ICategories => {
        const tags: ICategories = {
            ingredients: [],
            appliances: [],
            ustensils: [],
        };
        recipes.forEach((recipe) => {
            recipe.ingredients?.forEach((ingredient) => {
                const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
                const alreadyExistIn = tags.ingredients.includes(lowerCaseIngredient);
                const notInPins = excludePins && !this._pins.some((pin) => pin.content === lowerCaseIngredient);

                if (!alreadyExistIn && (!excludePins || notInPins)) {
                    tags.ingredients.push(lowerCaseIngredient);
                }
            });
            recipe.ustensils?.forEach((ustensil) => {
                const lowerCaseUstensil = ustensil.toLocaleLowerCase();
                const alreadyExistIn = tags.ustensils.includes(lowerCaseUstensil);
                const notInPins = excludePins && !this._pins.some((pin) => pin.content === lowerCaseUstensil);

                if (!alreadyExistIn && (!excludePins || notInPins)) {
                    tags.ustensils.push(lowerCaseUstensil);
                }
            });
            if (recipe.appliance) {
                const lowerCaseAppliance = recipe.appliance.toLowerCase();
                const alreadyExistIn = tags.appliances.includes(lowerCaseAppliance);
                const notInPins = excludePins && !this._pins.some((pin) => pin.content === lowerCaseAppliance);
                if (!alreadyExistIn && (!excludePins || notInPins)) {
                    tags.appliances.push(lowerCaseAppliance);
                }
            }
        });
        return tags;
    };

    public get recipes(): IRecipe[] {
        return this._recipes;
    }
    public get tags(): ICategories {
        return this._categories;
    }
    public get pins(): IPin[] {
        return this._pins;
    }
    public get search(): ISearch {
        return this._search;
    }

    /**
     * Get the category array of pins names
     * @param type Name of the category
     * @returns
     */
    public getCategorie = (type: ECategorieType): string[] => {
        return this._categories[type];
    };

    /**
     * Add a pin to the pins array
     * @param item Pin object
     * @emits gs_pins_add
     * @emits gs_search
     */
    public addPins = (item: IPin): void => {
        if (!this._pins.find((pin) => pin.content === item.content)) {
            this._pins.push(item);
            this.setSearch(this._search.search, true, true);
            document.dispatchEvent(new CustomEvent('gs_pins_add', { detail: item }));
        }
    };

    /**
     * Remove a pin from the pins array
     * @param item Pin object
     * @emits gs_pins_remove
     * @emits gs_search
     */
    public removePins = (item: IPin): void => {
        const index = this._pins.findIndex((pin) => pin.content === item.content);
        if (index > -1) {
            this._pins.splice(index, 1);
            this.setSearch(this._search.search, true, true);
            document.dispatchEvent(new CustomEvent('gs_pins_remove', { detail: item }));
        }
    };
}
