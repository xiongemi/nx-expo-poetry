import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Centre } from '../centre/centre';

export interface ShowLoadingProps {
  showLoading: boolean;
  children?: ReactNode;
}

export function ShowLoading({ showLoading, children }: ShowLoadingProps) {
  return showLoading ? (
    <Centre>
      <ActivityIndicator animating={true} size="large" children={undefined} />
    </Centre>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
}

export default ShowLoading;
