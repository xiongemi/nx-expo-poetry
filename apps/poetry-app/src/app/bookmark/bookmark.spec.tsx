import { render } from '@testing-library/react-native';
import React from 'react';

import Bookmark from './bookmark';

describe('Bookmark', () => {
  it('should render successfully', () => {
    const { container } = render(<Bookmark />);
    expect(container).toBeTruthy();
  });
});
