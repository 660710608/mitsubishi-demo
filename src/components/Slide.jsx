import { storyblokEditable } from '@storyblok/react/rsc';

const Slide = ({ blok }) => (
    <div {...storyblokEditable(blok)}>
        {blok.image?.filename && (
            <img src={blok.image.filename} alt={blok.title || ''} />
        )}
        {blok.title && <h2>{blok.title}</h2>}
        {blok.caption && <p>{blok.caption}</p>}
    </div>
);

export default Slide;