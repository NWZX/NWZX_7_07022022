import { style } from '@vanilla-extract/css';

export const dummyContainerStyle = style({
    width: '100%',
    height: 'calc(200px + 6rem + 4rem + 1rem)',
});
export const containerStyle = style({
    borderRadius: '8px',
    backgroundColor: '#e7e7e7',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',

    opacity: 0,
    visibility: 'hidden',

    transition: 'opacity 0.2s linear',
    selectors: {
        '&[data-visible="true"]': {
            opacity: 1,
            visibility: 'visible',
        },
    },
});

export const imgStyle = style({
    width: '100%',
    height: '200px',
    borderRadius: '8px 8px 0 0',
    backgroundColor: '#c7bebe',
});

export const headStyle = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
});
export const titleStyle = style({
    width: '90%',
});
export const timeStyle = style({
    whiteSpace: 'nowrap',
});
export const timeIconStyle = style({
    marginRight: '0.5rem',
});

export const footStyle = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
});

export const recipeStyle = style({
    padding: '0',
    margin: '0',
    fontSize: '0.9rem',
});
export const ingredientStyle = style({
    listStyle: 'none',
});
export const descriptionStyle = style({
    fontSize: '0.9rem',
    display: '-webkit-box',
    WebkitLineClamp: '6',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: 0,
});
