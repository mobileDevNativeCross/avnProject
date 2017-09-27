import { Dimensions } from 'react-native';

export const Window = Dimensions.get('window');

export const DropZoneParams = {
  height: Window.height / 4,
  width: Window.width
};

export const CardParams = {
  width: Window.width - 60,
  height: Window.height / 2,
  positionX: (Window.width - (Window.width - 60)) / 2,
  positionY: (Window.height - (Window.height / 2)) / 2
};
