import { BookmarksEntity } from '@nx-expo-poetry/store';
import React from 'react';
import { List, IconButton, Colors } from 'react-native-paper';

export interface BookmarksProps {
  formattedDate: string;
  bookmark: BookmarksEntity;
  removeBookmark: (bookmark: BookmarksEntity) => void;
}

export function Bookmark({
  bookmark,
  formattedDate,
  removeBookmark,
}: BookmarksProps) {
  return (
    <List.Item
      title={bookmark.title}
      description={formattedDate + '\n' + bookmark?.lines[0] + '...'}
      right={() => (
        <IconButton
          icon="minus-circle"
          color={Colors.red500}
          onPress={() => removeBookmark(bookmark)}
        />
      )}
    />
  );
}

export default Bookmark;
