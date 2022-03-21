import { BookmarksEntity } from '@nx-expo-poetry/store';
import React from 'react';
import { List, IconButton, Colors } from 'react-native-paper';

export interface BookmarkListItemProps {
  bookmark: BookmarksEntity;
  removeBookmark: (bookmark: BookmarksEntity) => void;
  onPress: () => void;
}

export function BookmarkListItem({
  bookmark,
  removeBookmark,
  onPress,
}: BookmarkListItemProps) {
  return (
    <List.Item
      title={bookmark.poem.title}
      descriptionNumberOfLines={3}
      description={
        bookmark.formattedDate +
        '\n' +
        bookmark.poem.lines[0] +
        '...'
      }
      descriptionEllipsizeMode="tail"
      onPress={onPress}
      right={() => (
        <IconButton
          size={30}
          icon="remove-circle"
          color={Colors.red500}
          onPress={() => removeBookmark(bookmark)}
        />
      )}
    />
  );
}

export default BookmarkListItem;
