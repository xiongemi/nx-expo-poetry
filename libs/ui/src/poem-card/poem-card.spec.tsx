import React from 'react';
import { render } from '@testing-library/react-native';

import PoemCard from './poem-card';

describe('PoemCard', () => {
  it('should render successfully', () => {
    const { container } = render(<PoemCard />);
    expect(container).toBeTruthy();
  });
});
