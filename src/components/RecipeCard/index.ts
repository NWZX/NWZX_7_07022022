import { icon } from '@fortawesome/fontawesome-svg-core';
import { IRecipe } from '../../data/Interface';
import {
    containerStyle,
    descriptionStyle,
    dummyContainerStyle,
    footStyle,
    headStyle,
    imgStyle,
    ingredientStyle,
    recipeStyle,
    timeIconStyle,
    timeStyle,
    titleStyle,
} from './styles.css';

export interface IRecipeCardProps {
    data: IRecipe;
}

export const DummyRecipeCard = (props: { id: number }): HTMLDivElement => {
    const container = document.createElement('div');
    container.setAttribute('tabindex', '0');
    container.setAttribute('data-id', props.id.toString());
    container.classList.add(dummyContainerStyle);
    return container;
};

/**
 * RecipeCard component
 * @param props Component props
 * @returns
 */
const RecipeCard = (props: IRecipeCardProps): HTMLDivElement => {
    const container = document.createElement('div');
    container.setAttribute('tabindex', '0');
    container.classList.add(containerStyle);
    setTimeout(() => container.setAttribute('data-visible', 'true'), 1);

    const img = document.createElement('img');
    img.classList.add(imgStyle);
    img.setAttribute('width', '500');
    img.setAttribute('height', '200');
    img.setAttribute('src', 'https://via.placeholder.com/500x200');
    img.setAttribute('alt', props.data.name);

    const title = document.createElement('h2');
    title.classList.add(titleStyle);
    title.innerText = props.data.name;

    const clockIcon = icon({ prefix: 'far', iconName: 'clock' }, { classes: timeIconStyle });

    const time = document.createElement('p');
    time.classList.add(timeStyle);
    time.appendChild(clockIcon.node[0]);
    time.append(`${props.data.time} min`);

    const head = document.createElement('div');
    head.classList.add(headStyle);
    head.appendChild(title);
    head.appendChild(time);

    const description = document.createElement('p');
    description.classList.add(descriptionStyle);
    description.innerText = props.data.description;

    const recipe = document.createElement('ul');
    recipe.classList.add(recipeStyle);
    props.data.ingredients.forEach((ingredient) => {
        const li = document.createElement('li');
        li.classList.add(ingredientStyle);
        li.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity || ''} ${
            ingredient.unit || ''
        } `;
        recipe.appendChild(li);
    });

    const foot = document.createElement('div');
    foot.classList.add(footStyle);
    foot.appendChild(recipe);
    foot.appendChild(description);

    container.appendChild(img);
    container.appendChild(head);
    container.appendChild(foot);

    return container;
};

export default RecipeCard;
