import {
    buttonStyle,
    containerStyle,
    iconStyle,
    inputStyle,
    listboxLiStyle,
    listboxStyle,
    listboxUlStyle,
    vars,
} from './styles.css';
import { setElementVars } from '@vanilla-extract/dynamic';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { ETagType, IPin } from '../../data/Interface';

export interface IExpendableSearchListBoxProps {
    text: string;
    placeholder?: string;
    type: ETagType;
    color?: string;
    listbox?: string[];
    onSearch?: (value: string) => void;
    onExpand?: () => void;
    onCollapse?: () => void;
    onListboxClick?: (value: IPin) => void;
}

const createListBoxItem = (value: string, onClick?: (v: string) => void): HTMLLIElement => {
    const li = document.createElement('li');
    li.innerText = value;
    li.addEventListener('click', () => {
        onClick && onClick(value);
    });
    return li;
};
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

const ExpendableSearchListBox = (props: IExpendableSearchListBoxProps): HTMLDivElement => {
    let uiStatus = false;
    const container = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const listbox = document.createElement('div');

    //Container
    container.classList.add(containerStyle);
    container.setAttribute('aria-expanded', 'false');
    setElementVars(container, vars, { color: props?.color || '#3282f7' });

    const toggleListbox = (status: boolean, event?: () => void): void => {
        //Mutual exclusion
        if (status) {
            Array.from(container.parentElement.children).forEach((child) => {
                child.setAttribute('aria-expanded', 'false');
            });
        }

        container.setAttribute('aria-expanded', status.valueOf().toString());
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
    input.addEventListener('blur', (e) => {
        e.preventDefault();
        if (input.value.length === 0) {
            input.value = props.text;
            toggleListbox(false, props?.onCollapse);
        }
    });
    input.addEventListener('keyup', () => {
        if (props?.listbox) {
            if (!uiStatus && input.value.length > 0) {
                toggleListbox(true, props?.onExpand);
            } else if (uiStatus && input.value.length === 0) {
                toggleListbox(false, props?.onCollapse);
            }
            const filteredList = props.listbox.filter((v) => v.includes(input.value));
            listbox.replaceChildren(
                createListBox(filteredList || [], (v) =>
                    props?.onListboxClick({ content: v, color: props.color, type: props.type }),
                ),
            );
        }
    });

    //Button
    const faArrow = icon({ prefix: 'fas', iconName: 'chevron-down' }, { classes: iconStyle });

    button.classList.add(buttonStyle);
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
    listbox.setAttribute('role', 'listbox');
    listbox.appendChild(
        createListBox(props?.listbox || [], (v) =>
            props?.onListboxClick({ content: v, color: props.color, type: props.type }),
        ),
    );

    container.append(input, button, listbox);

    return container;
};

export default ExpendableSearchListBox;
