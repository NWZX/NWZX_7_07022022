import { headingStyle, imageStyle } from './styles.css';

export interface ILogoTitleProps {
    href?: string;
    src?: string;
    alt?: string;
    onClick?: () => void;
    onLoadError?: () => void;
}

/**
 * LogoTitle component
 * @param props Component props
 * @returns
 */
const LogoTitle = (props?: ILogoTitleProps): HTMLHeadingElement => {
    const img = document.createElement('img');
    img.setAttribute('width', '200');
    img.setAttribute('height', '150');
    img.classList.add(imageStyle);
    props?.src && img.setAttribute('src', props.src);
    props?.alt && img.setAttribute('alt', props.alt);
    props?.onLoadError && img.addEventListener('error', props.onLoadError);

    const a = document.createElement('a');
    a.classList.add('logo-title-link');
    props?.href && a.setAttribute('href', props.href);
    props?.onClick && a.addEventListener('click', props.onClick);
    a.appendChild(img);

    const h1 = document.createElement('h1');
    h1.classList.add(headingStyle);
    h1.appendChild(a);

    return h1;
};

export default LogoTitle;
