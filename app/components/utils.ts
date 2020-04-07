export const defaultImgUrl = 'http://localhost:5000/assets/default.png';

export const getImageLink = ({ url }) =>
  (url !== 'none' && url) || defaultImgUrl;
