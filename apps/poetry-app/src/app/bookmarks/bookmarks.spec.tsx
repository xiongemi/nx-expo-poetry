import { render } from '@testing-library/react-native';
import React from 'react';

import Bookmarks from './bookmarks';

describe('Bookmarks', () => {
  it('should render successfully', () => {
    const { container } = render(<Bookmarks />);
    expect(container).toBeTruthy();
  });
});
