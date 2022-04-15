
import { render } from '@testing-library/react-native';
import React from 'react';

import Loading from './full-height';

describe('Loading', () => {
  it('should render successfully', () => {
    const { container } = render(<Loading />);
    expect(container).toBeTruthy();
  });
});
