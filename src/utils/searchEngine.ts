import { IRecipe } from '../data/Interface';

/**
 * Classic version of SearchEngine
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
