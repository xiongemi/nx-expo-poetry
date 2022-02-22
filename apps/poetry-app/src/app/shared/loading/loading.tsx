import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Centre } from '../centre/centre';

export function Loading() {
  return (
    <Centre>
      <ActivityIndicator animating={true} size="large" children={undefined} />
    </Centre>
  );
}

export default Loading;
