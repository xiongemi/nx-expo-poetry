import { render } from '@testing-library/react-native';
import React from 'react';

import PoemOfTheDay from './poem-of-the-day';

describe('PoemOfTheDay', () => {
  it('should render successfully', () => {
    const { container } = render(<PoemOfTheDay />);
    expect(container).toBeTruthy();
  });
});
