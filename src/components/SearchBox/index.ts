import { inputStyle, iconStyle, formStyle } from './styles.css';

export interface ISearchBoxProps {
    text?: string;
    placeholder?: string;
    startSearchAt?: number;
    onSearch?: (value: string) => void;
    onClear?: () => void;
}

/**
 * SearchBox component
 */
const SearchBox = (props?: ISearchBoxProps): HTMLFormElement => {
    const input = document.createElement('input');

    input.classList.add(inputStyle);

    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', props?.placeholder || 'Search');
    input.setAttribute('value', props?.text || '');
    input.addEventListener('keydown', (e) => {
        if (props?.onSearch && props?.onClear && e.key === 'Enter') {
            e.preventDefault();
            props.onSearch(input.value);
        }
    });
    input.addEventListener('keyup', () => {
        if (props?.onSearch && props?.onClear) {
            if (input.value.length >= props?.startSearchAt) {
                props.onSearch(input.value);
            } else if (input.value.length === 0) {
                props.onClear();
            }
        }
    });

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-search');
    icon.classList.add(iconStyle);

    const form = document.createElement('form');
    form.classList.add(formStyle);
    form.appendChild(input);
    form.appendChild(icon);
    return form;
};

export default SearchBox;
