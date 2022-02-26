import Icon from '../assets/images/logo.png';
import LogoTitle from './components/LogoTitle';
import ExpendableSearchListBox from './components/ExpendableSearchListBox';
import Pins from './components/Pins';
import SearchBox from './components/SearchBox';
import {
    appStyle,
    expendableSearchListBoxGroupStyle,
    headerStyle,
    mainStyle,
    noResultStyle,
    pinsGroupStyle,
} from './main.css';

import { ETagType, IPin, IRecipe, ISearch, ITags } from './data/Interface';
import dataRaw from './data/sample.json';
import RecipeCard from './components/RecipeCard';
import { GlobalState } from './data/GlobalState';

const generateMediaCard = (data: IRecipe[]): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    data?.forEach((recipe: IRecipe) => {
        fragment.appendChild(RecipeCard({ data: recipe }));
    });
    return fragment;
};
const generatePins = (pins: IPin[], onClick?: (v: IPin) => void): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    pins?.forEach((pin) => {
        fragment.appendChild(
            Pins({
                ...pin,
                onClick: onClick,
            }),
        );
    });
    return fragment;
};
const generateExpendableSearchListBox = (data: ITags, onItemClick?: (e: IPin) => void): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    fragment.append(
        ExpendableSearchListBox({
            text: 'Ingredients',
            placeholder: 'Rechercher un ingrédient',
            type: ETagType.INGREDIENT,
            color: '#3282f7',
            listbox: data.ingredients.slice(0, 30),
            onListboxClick: onItemClick,
        }),
        ExpendableSearchListBox({
            text: 'Appareils',
            placeholder: 'Rechercher un appareil',
            type: ETagType.APPLIANCE,
            color: '#68d9a4',
            listbox: data.appliance.slice(0, 30),
            onListboxClick: onItemClick,
        }),
        ExpendableSearchListBox({
            text: 'Ustensiles',
            placeholder: 'Rechercher un ustensile',
            type: ETagType.USTENSIL,
            color: '#ed6454',
            listbox: data.ustensils.slice(0, 30),
            onListboxClick: onItemClick,
        }),
    );
    return fragment;
};

export const main = (): void => {
    const data: IRecipe[] = dataRaw as IRecipe[];
    const globalState = new GlobalState(data);

    //Header

    const header = document.createElement('header');
    header.classList.add(headerStyle);
    console.log(headerStyle);
    const loginTitle = LogoTitle({ src: Icon });
    const searchBox = SearchBox({
        placeholder: 'Rechercher une recette',
        startSearchAt: 3,
        onSearch: async (v) => {
            await globalState.setSearch(v);
        },
        onClear: () => {
            globalState.resetSearch();
        },
    });
    const pinsGroup = document.createElement('div');
    pinsGroup.classList.add(pinsGroupStyle);
    document.addEventListener('gs_pins', (e: Event & { detail: IPin[] }) => {
        pinsGroup.replaceChildren(
            generatePins(e.detail, (v) => {
                globalState.removePins(v);
            }),
        );
    });

    const expendableSearchListBoxGroup = document.createElement('div');
    expendableSearchListBoxGroup.classList.add(expendableSearchListBoxGroupStyle);
    expendableSearchListBoxGroup.appendChild(
        generateExpendableSearchListBox(globalState.tags, (e) => {
            globalState.addPins(e);
        }),
    );

    header.append(loginTitle, searchBox, pinsGroup, expendableSearchListBoxGroup);

    const main = document.createElement('main');
    main.classList.add(mainStyle);
    main.appendChild(generateMediaCard(data));
    document.addEventListener('gs_search', (e: Event & { detail: ISearch }) => {
        if (e.detail.reset) {
            expendableSearchListBoxGroup.replaceChildren(
                generateExpendableSearchListBox(globalState.tags, (e) => {
                    globalState.addPins(e);
                }),
            );
            main.replaceChildren(generateMediaCard(globalState.recipes));
        } else if (e.detail.searchResult.length == 0) {
            const noResult = document.createElement('div');
            noResult.classList.add(noResultStyle);
            noResult.innerText =
                'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
            main.replaceChildren(noResult);
        } else {
            expendableSearchListBoxGroup.replaceChildren(
                generateExpendableSearchListBox(e.detail.searchResultTags, (e) => {
                    globalState.addPins(e);
                }),
            );
            main.replaceChildren(generateMediaCard(e.detail.searchResult));
        }
    });

    const app = document.querySelector<HTMLBodyElement>('#app');
    app?.append(header, main);
    app?.classList.add(appStyle);
};
main();
