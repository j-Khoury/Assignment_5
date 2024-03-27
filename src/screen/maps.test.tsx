import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import Maps from './Maps';

describe('Maps component', () => {
  it('renders markers correctly', () => {
    const {getAllByTestId} = render(<Maps />);
    const markers = getAllByTestId('marker');
    expect(markers.length).toBe(1);
  });
});
