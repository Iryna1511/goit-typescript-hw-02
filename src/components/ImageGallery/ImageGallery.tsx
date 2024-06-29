import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { ImageGalleryProps } from '../types';
import { FC, forwardRef } from 'react';

const ImageGallery: FC<ImageGalleryProps> = ({ data, openModal }) => {
  return (
    <ul className={css.gallery}>
      {data.map(image => {
        return (
          <li className={css.item} key={image.id}>
            <ImageCard openModal={openModal} image={image} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
