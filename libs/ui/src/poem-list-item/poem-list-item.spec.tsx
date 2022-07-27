import { render } from '@testing-library/react-native';
import React from 'react';

import PoemListItem from './poem-list-item';

describe('PoemList', () => {
  it('should render successfully', () => {
    const { container } = render(<PoemListItem />);
    expect(container).toBeTruthy();
  });
});
