import { IRecipe } from '../data/Interface';

const AlternativeEvery = <T>(data: T[], predicate: (item: T) => boolean): boolean => {
    for (let i = 0; i < data.length; i++) {
        if (!predicate(data[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Alternative version of SearchEngine (beacuse it's use break to escape from loop)
 * @param data Array of IRecipe
 * @param search Researched strings
 * @param advancedMode Expend research to ustensils and appliance
 * @returns Array of IRecipe which match the researched strings
 */
export const AlternativeSearchEngine = async (
    data: IRecipe[],
    search: string,
    advancedMode = false,
): Promise<IRecipe[]> => {
    const searchArray = search.toLowerCase().split(' ');
    const result = new Array(data.length);
    let j = 0;
    for (let i = 0; i < data.length; i++) {
        const isValid = AlternativeEvery(searchArray, (searchWord) => {
            return !(
                data[i].name.toLowerCase().indexOf(searchWord) === -1 &&
                data[i].description.toLowerCase().indexOf(searchWord) === -1 &&
                AlternativeEvery(
                    data[i].ingredients,
                    (ingredient) => ingredient.ingredient.toLowerCase().indexOf(searchWord) === -1,
                ) &&
                (advancedMode
                    ? AlternativeEvery(
                          data[i].ustensils,
                          (ustensil) => ustensil.toLowerCase().indexOf(searchWord) === -1,
                      )
                    : true) &&
                (advancedMode ? data[i].appliance.toLowerCase().indexOf(searchWord) === -1 : true)
            );
        });
        if (isValid) {
            result[j] = data[i];
            j++;
        }
    }
    return result.slice(0, j);
};

/**
 * Unoptimized/Classic version of SearchEngine
 * @param data Array of IRecipe
 * @param search Researched strings
 * @param advancedMode Expend research to ustensils and appliance
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
