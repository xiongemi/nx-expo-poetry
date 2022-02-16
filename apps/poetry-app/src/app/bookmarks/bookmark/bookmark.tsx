import { Poem } from '@nx-expo-poetry/models';
import React from 'react';
import { List, IconButton, Colors } from 'react-native-paper';

export interface BookmarksProps {
  poem: Poem;
}

export function Bookmark({ poem }: BookmarksProps) {
  return (
    <List.Item
      title={poem.title}
      description={poem?.lines[0] + '...'}
      right={() => (
        <IconButton
          icon="minus-circle"
          color={Colors.red500}
          onPress={() => console.log('Pressed')}
        />
      )}
    />
  );
}

export default Bookmark;
