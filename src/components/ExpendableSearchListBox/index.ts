import {
    buttonStyle,
    containerStyle,
    iconStyle,
    inputStyle,
    listboxLiStyle,
    listboxStyle,
    listboxUlStyle,
    topContainerStyle,
    vars,
} from './styles.css';
import { setElementVars } from '@vanilla-extract/dynamic';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { ECategorieType, IPin } from '../../data/Interface';

export interface IExpendableSearchListBoxProps {
    text: string;
    placeholder?: string;
    type: ECategorieType;
    color?: string;
    listbox?: string[];
    onSearch?: (value: string) => void;
    onExpand?: () => void;
    onCollapse?: () => void;
    onListboxClick?: (value: IPin) => void;
}

/**
 * Create a listbox rows (oriented as columns)
 * @param value Array of pin names
 * @param onClick Function to call when an pin names is clicked
 * @returns
 */
const createListBoxItem = (value: string, onClick?: (v: string) => void): HTMLLIElement => {
    const li = document.createElement('li');
    li.setAttribute('tabindex', '0');
    li.innerText = value;
    li.addEventListener('click', () => {
        onClick && onClick(value);
    });
    li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            onClick && onClick(value);
        }
    });
    return li;
};

/**
 * Create a listbox columns (oriented as rows)
 * @param values Array of pin names
 * @param onClick Function to call when an pin names is clicked
 * @returns
 */
const createListBoxSub = (values: string[], onClick?: (v: string) => void): HTMLUListElement => {
    const ul = document.createElement('ul');
    ul.classList.add(listboxUlStyle);
    values.forEach((value) => {
        const li = createListBoxItem(value, onClick);
        li.classList.add(listboxLiStyle);
        ul.appendChild(li);
    });
    return ul;
};
/**
 * Create a listbox
 * @param values Array of pin names
 * @param onClick Function to call when an pin names is clicked
 * @returns
 */
const createListBox = (values: string[], onClick?: (v: string) => void): DocumentFragment => {
    const template = document.createDocumentFragment();

    const listboxLength = values.length || 0;
    const chunk = Math.floor(listboxLength / 3);
    const chunkOver = listboxLength % 3;

    for (let i = 0; i < chunk + 1; i++) {
        if (i < chunk) {
            const ul = createListBoxSub(values.slice(3 * i, 3 * (i + 1)), onClick);
            template.appendChild(ul);
        } else if (chunkOver > 0) {
            const ul = createListBoxSub(values.slice(3 * i), onClick);
            template.appendChild(ul);
        }
    }
    return template;
};

/**
 * ExpendableSearchListBox component
 * @param props Component props
 * @returns
 */
const ExpendableSearchListBox = (props: IExpendableSearchListBoxProps): HTMLDivElement => {
    let uiStatus = false;
    const container = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const listbox = document.createElement('div');

    //Container
    container.classList.add(containerStyle);
    container.setAttribute('data-expanded', 'false');
    setElementVars(container, vars, { color: props?.color || '#3282f7' });

    const toggleListbox = (status: boolean, event?: () => void): void => {
        //Mutual exclusion
        if (status) {
            Array.from(container.parentElement.children).forEach((child) => {
                child.setAttribute('data-expanded', 'false');
            });
        }

        container.setAttribute('data-expanded', status.valueOf().toString());
        uiStatus = status;
        event && event();
    };

    //Input
    input.classList.add(inputStyle);
    input.setAttribute('type', 'search');
    props?.placeholder && input.setAttribute('placeholder', props.placeholder);
    props?.text && input.setAttribute('value', props.text);
    input.addEventListener('focus', () => {
        if (input.value === props.text) {
            input.value = '';
            toggleListbox(true, props?.onExpand);
        } else if (input.value.length === 0 && uiStatus) {
            toggleListbox(false, props?.onCollapse);
        }
    });
    input.addEventListener('blur', () => {
        if (input.value.length === 0) {
            input.value = props.text;
            toggleListbox(false, props?.onCollapse);
        }
    });
    input.addEventListener('keyup', () => {
        if (props?.listbox) {
            if (!uiStatus && input.value.length > 0) {
                toggleListbox(true, props?.onExpand);
            }
            const filteredList = props.listbox.filter((v) => v.includes(input.value.toLowerCase()));
            listbox.replaceChildren(
                createListBox(filteredList || [], (v) =>
                    props?.onListboxClick({ content: v, color: props.color, type: props.type }),
                ),
            );
        }
    });

    //Button
    const faArrow = icon(
        { prefix: 'fas', iconName: 'chevron-down' },
        { classes: iconStyle, attributes: { 'aria-hidden': 'true' } },
    );

    button.classList.add(buttonStyle);
    button.setAttribute('aria-label', 'Expend/Collapse');

    button.addEventListener('click', () => {
        if (uiStatus) {
            toggleListbox(false, props?.onCollapse);
        } else {
            toggleListbox(true, props?.onExpand);
        }
    });
    button.appendChild(faArrow.node[0]);

    //Listbox
    listbox.classList.add(listboxStyle);
    listbox.appendChild(
        createListBox(props?.listbox || [], (v) =>
            props?.onListboxClick({ content: v, color: props.color, type: props.type }),
        ),
    );

    const topContainer = document.createElement('div');
    topContainer.classList.add(topContainerStyle);
    topContainer.append(input, button);
    container.append(topContainer, listbox);

    return container;
};

export default ExpendableSearchListBox;
