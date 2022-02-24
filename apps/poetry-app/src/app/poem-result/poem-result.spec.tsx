import { render } from '@testing-library/react-native';
import React from 'react';

import PoemResult from './poem-result';

describe('PoemResult', () => {
  it('should render successfully', () => {
    const { container } = render(<PoemResult />);
    expect(container).toBeTruthy();
  });
});
