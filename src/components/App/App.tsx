import { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getImages } from '../api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { Image } from '../types';

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState({ alt: '', url: '' });

  useEffect(() => {
    async function fetchImages() {
      if (query.trim() === '') return;
      try {
        setIsError(false);
        setIsLoading(true);
        const imagesData = await getImages(query, page);
        setImages(prevState => [...prevState, ...imagesData.results]);
        setIsLast(() => imagesData.total_pages === page);
        if (imagesData.total === 0) {
          const notifyNoResults = () =>
            toast.error('We did not find anything for your query. Try again!', {
              position: 'top-right',
            });
          return notifyNoResults();
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const notifyEmpty = () =>
    toast.error('There is nothing to search for', {
      position: 'top-right',
    });

  const onSearch = async (topic: string) => {
    if (topic === '') return notifyEmpty();
    setQuery(topic);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const openModal = (alt: string, url: string) => {
    setIsModalOpen(true);
    setImageInfo({ alt, url });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageInfo({ alt: '', url: '' });
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery openModal={openModal} data={images} />
      )}
      <ImageModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        imageInfo={imageInfo}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMsg />}
      {images.length > 0 && !isLoading && !isLast && !isError && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
}
