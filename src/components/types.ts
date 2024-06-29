import React, { MutableRefObject, RefObject } from 'react';

export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
  alt_description: string;
}

export interface ImageGalleryProps {
  openModal: (description: string, urls: string) => void;
  data: Image[];
  lastImageRef?: RefObject<HTMLLIElement>;
  ref?: MutableRefObject<HTMLDivElement | null>;
}

export interface ImageCardProps {
  openModal: (description: string, urls: string) => void;
  image: Image;
}

export interface ImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  imageInfo: {
    alt: string;
    url: string;
  };
}

export interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}
