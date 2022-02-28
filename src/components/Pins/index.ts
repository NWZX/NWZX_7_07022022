import { containerStyle, buttonStyle, textStyle, iconStyle, vars } from './styles.css';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { IPin } from '../../data/Interface';
import { setElementVars } from '@vanilla-extract/dynamic';

export interface IPins extends IPin {
    onClick?: (e: HTMLDivElement, v: IPin) => void;
}

/**
 * Pins component
 * @param props Component props
 * @returns
 */
const Pins = (props: IPins): HTMLDivElement => {
    const faCircle = icon({ prefix: 'far', iconName: 'circle-xmark' }, { classes: iconStyle });

    const button = document.createElement('button');
    button.classList.add(buttonStyle);
    button.appendChild(faCircle.node[0]);

    const text = document.createElement('span');
    text.classList.add(textStyle);
    text.innerText = props.content;

    const container = document.createElement('div');
    setElementVars(container, vars, { color: props?.color || '#3282f7' });
    props?.onClick && button.addEventListener('click', () => props.onClick(container, { ...props }));

    container.classList.add(containerStyle);
    setTimeout(() => container.setAttribute('data-visible', 'true'), 1);
    container.appendChild(text);
    container.appendChild(button);

    return container;
};

export default Pins;
