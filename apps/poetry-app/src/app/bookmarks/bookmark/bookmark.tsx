import { BookmarksEntity } from '@nx-expo-poetry/store';
import React from 'react';
import { List, IconButton, Colors } from 'react-native-paper';

export interface BookmarksProps {
  bookmark: BookmarksEntity;
  removeBookmark: (bookmark: BookmarksEntity) => void;
}

export function Bookmark({
  bookmark,
  removeBookmark,
}: BookmarksProps) {
  return (
    <List.Item
      title={bookmark.poem.title}
      descriptionNumberOfLines={3}
      description={bookmark.formattedDate + '\n' + bookmark.poem.lines[0]}
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
