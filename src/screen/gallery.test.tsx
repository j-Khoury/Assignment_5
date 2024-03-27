import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import GalleryTesting from './gallery.tsx';

test('renders GalleryTesting', () => {
  render(<GalleryTesting />);
});
test('uploads image on button press', () => {
  const {getByText} = render(<GalleryTesting />);
  const uploadButton = getByText('Upload Image');
  fireEvent.press(uploadButton);
});
test('loads more data when reaching end of list', () => {
  const {getByText} = render(<GalleryTesting />);
  fireEvent.scroll(getByText('End of List'));
});
test('renders correctly', () => {
  const {toJSON} = render(<GalleryTesting />);
  const tree = toJSON();
  expect(tree).toMatchSnapshot();
});
