import React, { ReactNode } from 'react';
import { ActivityIndicator, Avatar, Button, Headline, Subheading } from 'react-native-paper';

import { Centre } from '../centre/centre';

export interface ShowLoadingProps {
  showLoading: boolean;
  hasError: boolean;
  reload: () => void;
  children: ReactNode;
}

export function ShowLoading({
  showLoading,
  hasError,
  reload,
  children,
}: ShowLoadingProps) {
  return showLoading ? (
    <Centre>
      <ActivityIndicator animating={true} size="large" children={undefined} />
    </Centre>
  ) : hasError ? (
    <Centre>
      <Avatar.Icon size={40} icon="alert-circle" children={undefined} />
      <Headline>Oops~ Something went wrong</Headline>
      <Subheading>Make sure you got internet connection.</Subheading>
      <Button onPress={reload}>Try Again</Button>
    </Centre>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
}

export default ShowLoading;
