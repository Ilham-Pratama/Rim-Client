import { defaultPicture } from '../urls';

export interface userData {
  id: string;
  username: string;
  password: string;
  email: string;
  imgurl: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
}

export const getImageLink = ({ url }) =>
  (url !== 'none' && url) || defaultPicture;

export const usePerson = (): userData => {
  try {
    const bearerToken = localStorage.getItem('token');
    const payloadEncoding = bearerToken.split('.')[1];
    const rawData = atob(payloadEncoding);
    return JSON.parse(rawData);
  } catch {
    return null;
  }
};
