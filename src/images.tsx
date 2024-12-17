import { IAssetImage } from 'interfaces';

const images: IAssetImage = {};

const reqImages = require.context('./assets/images', false, /\.(png|jpe?g|svg)$/);
reqImages.keys().forEach((key) => {
  images[key] = reqImages(key);
});

export { images };
