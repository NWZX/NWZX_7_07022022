import { IRecipe } from '../data/Interface';

const AlternativeEvery = <T>(data: T[], predicate: (item: T) => boolean): boolean => {
    let result = true;
    for (let i = 0; i < data.length; i++) {
        if (!predicate(data[i])) {
            result = false;
            break;
        }
    }
    return result;
};

/**
 * Alternative version of SearchEngine (beacuse it's use break to escape from loop)
 * @param data Array of IRecipe
 * @param search Researched strings
 * @returns Array of IRecipe which match the researched strings
 */
export const AlternativeSearchEngine = async (data: IRecipe[], search: string): Promise<IRecipe[]> => {
    const searchArray = search.toLowerCase().split(' ');
    const result: IRecipe[] = [];
    for (const recipe of data) {
        const isValid = AlternativeEvery(searchArray, (searchWord) => {
            return !(
                recipe.name.toLowerCase().indexOf(searchWord) === -1 &&
                recipe.description.toLowerCase().indexOf(searchWord) === -1 &&
                AlternativeEvery(
                    recipe.ingredients,
                    (ingredient) => ingredient.ingredient.toLowerCase().indexOf(searchWord) === -1,
                )
            );
        });
        isValid && result.push(recipe);
    }
    return result;
};

/**
 * Unoptimized/Classic version of SearchEngine
 * @param data Array of IRecipe
 * @param search Researched strings
 * @returns Array of IRecipe which match the researched strings
 */
export const SearchEngine = async (data: IRecipe[], search: string, advancedMode = false): Promise<IRecipe[]> => {
    const searchArray = search.toLowerCase().split(' ');
    return data.filter((recipe) => {
        return searchArray.every((searchWord) => {
            return !(
                recipe.name.toLowerCase().indexOf(searchWord) === -1 &&
                recipe.description.toLowerCase().indexOf(searchWord) === -1 &&
                recipe.ingredients.every(
                    (ingredient) => ingredient.ingredient.toLowerCase().indexOf(searchWord) === -1,
                ) &&
                (advancedMode
                    ? recipe.ustensils.every((ustensil) => ustensil.toLowerCase().indexOf(searchWord) === -1)
                    : true) &&
                (advancedMode ? recipe.appliance.toLowerCase().indexOf(searchWord) === -1 : true)
            );
        });
    });
};
