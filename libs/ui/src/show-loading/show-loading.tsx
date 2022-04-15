
import React, { ReactNode } from 'react';
import { Avatar, Button, Headline, Subheading } from 'react-native-paper';

import { Centre } from '../centre/centre';
import Loading from '../loading/loading';
import Spacing from '../spacing/spacing';

export interface ShowLoadingProps {
  showLoading: boolean;
  hasError: boolean;
  reload?: () => void;
  children: ReactNode;
}

export function ShowLoading({
  showLoading,
  hasError,
  reload,
  children,
}: ShowLoadingProps) {
  return showLoading ? (
    <Loading></Loading>
  ) : hasError ? (
    <Centre>
      <Spacing>
        <Avatar.Icon size={40} icon="alert" children={undefined} />
      </Spacing>
      <Headline>Oops~ Something went wrong</Headline>
      <Subheading>Make sure you got internet connection.</Subheading>
      {reload && (
        <Button onPress={reload} mode="contained">
          Try Again
        </Button>
      )}
    </Centre>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
}

export default ShowLoading;
