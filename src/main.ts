//Dynamic import for components
const Dynamic_ExpendableSearchListBox = { default: () => import('./components/ExpendableSearchListBox') };
const Dynamic_LogoTitle = { default: () => import('./components/LogoTitle') };
const Dynamic_Pins = { default: () => import('./components/Pins') };
const Dynamic_SearchBox = { default: () => import('./components/SearchBox') };
const Dynamic_RecipeCard = { default: () => import('./components/RecipeCard') };

// Style & Ressource imports
import Icon from '../assets/images/logo.png';
import {
    appStyle,
    expendableSearchListBoxGroupStyle,
    headerStyle,
    mainStyle,
    noResultStyle,
    pinsGroupStyle,
} from './main.css';

// Data fetching
import dataRaw from './data/sample.json';
import { ECategorieType, IPin, IRecipe, ISearch, ICategories } from './data/Interface';
import { GlobalState } from './data/GlobalState';

/**
 * Transform `IRecipe[]` data to HTML `DocumentFragment`
 * @param data Array of recipes
 * @returns
 */
const generateMediaCard = async (data: IRecipe[]): Promise<DocumentFragment> => {
    const RecipeCard = await Dynamic_RecipeCard.default();

    // Lazy load the mediaCard
    const observer = new IntersectionObserver(
        async (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const mediaCard = entry.target;
                const i = Number.parseInt(mediaCard.getAttribute('data-id')) as number;
                mediaCard.replaceWith(RecipeCard.default({ data: data[i] }));
                observer.unobserve(mediaCard);
            });
        },
        {
            threshold: [0.2],
        },
    );

    const fragment = document.createDocumentFragment();
    data?.forEach((_, i) => {
        const card = RecipeCard.DummyRecipeCard({ id: i });
        observer.observe(card);
        fragment.appendChild(card);
    });
    return fragment;
};

/**
 * Transform `IPin` data to HTML `DocumentFragment`
 * @param pin Pins Obejct
 * @param onClick Event to call when a pin is clicked
 * @returns
 */
const generatePins = async (pin: IPin, onClick?: (e: HTMLDivElement, v: IPin) => void): Promise<DocumentFragment> => {
    const Pins = (await Dynamic_Pins.default()).default;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(
        Pins({
            ...pin,
            onClick: onClick,
        }),
    );
    return fragment;
};

/**
 * Transform `ICategories` data to HTML `DocumentFragment`
 * @param data Categories object
 * @param onItemClick Event to call when a tag is clicked
 * @returns
 */
const generateExpendableSearchListBox = async (
    data: ICategories,
    onItemClick?: (e: IPin) => void,
): Promise<DocumentFragment> => {
    const maxItem = 30;
    const ExpendableSearchListBox = (await Dynamic_ExpendableSearchListBox.default()).default;
    const fragment = document.createDocumentFragment();
    fragment.append(
        ExpendableSearchListBox({
            text: 'Ingredients',
            placeholder: 'Rechercher un ingrédient',
            type: ECategorieType.INGREDIENT,
            color: '#3282f7',
            listbox: data.ingredients.slice(0, maxItem),
            onListboxClick: onItemClick,
        }),
        ExpendableSearchListBox({
            text: 'Appareils',
            placeholder: 'Rechercher un appareil',
            type: ECategorieType.APPLIANCE,
            color: '#68d9a4',
            listbox: data.appliances.slice(0, maxItem),
            onListboxClick: onItemClick,
        }),
        ExpendableSearchListBox({
            text: 'Ustensiles',
            placeholder: 'Rechercher un ustensile',
            type: ECategorieType.USTENSIL,
            color: '#ed6454',
            listbox: data.ustensils.slice(0, maxItem),
            onListboxClick: onItemClick,
        }),
    );
    return fragment;
};

/**
 * Generate index page
 */
export const main = async (): Promise<void> => {
    const data: IRecipe[] = dataRaw as IRecipe[];
    const globalState = new GlobalState(data);

    //#region Header
    const header = document.createElement('header');
    header.classList.add(headerStyle);

    const LogoTitle = (await Dynamic_LogoTitle.default()).default;
    const loginTitle = LogoTitle({ src: Icon, alt: 'Les petits plats', href: '/' });
    const SearchBox = (await Dynamic_SearchBox.default()).default;
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
    pinsGroup.setAttribute('data-visible', 'false');
    document.addEventListener('gs_pins_add', async (e: Event & { detail: IPin }) => {
        pinsGroup.setAttribute('data-visible', 'true');
        pinsGroup.appendChild(
            await generatePins(e.detail, (e, v) => {
                e.setAttribute('data-visible', 'false');
                setTimeout(() => {
                    globalState.removePins(v);
                    e.remove();

                    if (globalState.pins.length === 0) {
                        pinsGroup.setAttribute('data-visible', 'false');
                    }
                }, 250);
            }),
        );
    });

    const expendableSearchListBoxGroup = document.createElement('div');
    expendableSearchListBoxGroup.classList.add(expendableSearchListBoxGroupStyle);
    expendableSearchListBoxGroup.appendChild(
        await generateExpendableSearchListBox(globalState.tags, (e) => {
            globalState.addPins(e);
        }),
    );

    header.append(loginTitle, searchBox, pinsGroup, expendableSearchListBoxGroup);
    //#endregion

    //#region Main
    const main = document.createElement('main');
    main.classList.add(mainStyle);
    main.appendChild(await generateMediaCard(data));
    document.addEventListener('gs_search', async (e: Event & { detail: ISearch }) => {
        if (e.detail.reset) {
            expendableSearchListBoxGroup.replaceChildren(
                await generateExpendableSearchListBox(globalState.tags, (e) => {
                    globalState.addPins(e);
                }),
            );
            main.replaceChildren(await generateMediaCard(globalState.recipes));
        } else if (e.detail.searchResult.length == 0) {
            const noResult = document.createElement('div');
            noResult.classList.add(noResultStyle);
            noResult.innerText =
                'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
            main.replaceChildren(noResult);
        } else {
            expendableSearchListBoxGroup.replaceChildren(
                await generateExpendableSearchListBox(e.detail.searchResultTags, (e) => {
                    globalState.addPins(e);
                }),
            );
            main.replaceChildren(await generateMediaCard(e.detail.searchResult));
        }
    });
    //#endregion

    const app = document.querySelector<HTMLBodyElement>('#app');
    app?.classList.add(appStyle);
    app?.append(header);
    app?.append(main);
};
main();
