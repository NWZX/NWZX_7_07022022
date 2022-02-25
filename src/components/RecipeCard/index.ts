import { icon } from '@fortawesome/fontawesome-svg-core';
import { IRecipe } from '../../data/Interface';
import {
    containerStyle,
    descriptionStyle,
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

const RecipeCard = (props: IRecipeCardProps): HTMLDivElement => {
    const container = document.createElement('div');
    container.classList.add(containerStyle);

    const img = document.createElement('img');
    img.classList.add(imgStyle);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('src', '');
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

    const recipe = document.createElement('div');
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
