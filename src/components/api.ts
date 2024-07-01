import axios, { AxiosResponse } from 'axios';
import { Image } from './types';

axios.defaults.baseURL = 'https://api.unsplash.com';

export const getImages = async (query: string, currentPage: number) => {
  const response: AxiosResponse<ImageData> = await axios.get('/search/photos', {
    params: {
      query: query,
      page: currentPage,
      per_page: 16,
      client_id: 'L3oNBkxGmmmx6KxYA22nKxS9s3chFacv8PWv1laI7g4',
      orientation: 'landscape',
    },
  });

  console.log(response.data);
  return response.data;
};

interface ImageData {
  total: number;
  results: Image[];
  total_pages: number;
}

// export interface AxiosRespons {
//   data: {
//     total: number;
//     results: Image[];
//     total_pages: number;
//   };
//   status: number;
//   statusText: string;
//   headers: any;
//   config: AxiosRequestConfig;
//   request?: any;
// }
