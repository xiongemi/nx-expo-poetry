import { render } from '@testing-library/react-native';
import React from 'react';

import BookmarkListItem from './bookmark-list-item';

describe('Bookmark', () => {
  it('should render successfully', () => {
    const { container } = render(<BookmarkListItem />);
    expect(container).toBeTruthy();
  });
});
