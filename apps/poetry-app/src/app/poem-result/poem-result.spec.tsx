import React from 'react';
import { render } from '@testing-library/react-native';

import PoemResult from './poem-result';

describe('PoemResult', () => {
  it('should render successfully', () => {
    const { container } = render(<PoemResult />);
    expect(container).toBeTruthy();
  });
});
