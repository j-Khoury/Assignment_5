import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CameraPage from './camera.tsx';

const mockNavigation = {navigate: jest.fn()};

describe('CameraPage component', () => {
  test('renders correctly', () => {
    const {toJSON} = render(<CameraPage navigation={mockNavigation} />);
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('navigates to Photo screen when "Take Photo" button is pressed', () => {
    const {getByText} = render(<CameraPage navigation={mockNavigation} />);
    const takePhotoButton = getByText('Take Photo');
    fireEvent.press(takePhotoButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Photo');
  });

  test('navigates to Gallery screen when "Open Gallery" button is pressed', () => {
    const {getByText} = render(<CameraPage navigation={mockNavigation} />);
    const openGalleryButton = getByText('Open Gallery');
    fireEvent.press(openGalleryButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Gallery');
  });

  test('navigates to Maps screen when "Open Maps" button is pressed', () => {
    const {getByText} = render(<CameraPage navigation={mockNavigation} />);
    const openMapsButton = getByText('Open Maps');
    fireEvent.press(openMapsButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Maps');
  });
});
