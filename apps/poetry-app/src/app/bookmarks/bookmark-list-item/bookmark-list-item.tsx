import { BookmarksEntity } from '@nx-expo-poetry/store';
import React from 'react';
import { List, IconButton, useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  return (
    <List.Item
      title={bookmark.poem.title}
      descriptionNumberOfLines={3}
      description={
        bookmark.formattedDate + '\n' + bookmark.poem.lines[0] + '...'
      }
      descriptionEllipsizeMode="tail"
      onPress={onPress}
      right={() => (
        <IconButton
          size={30}
          icon="remove-circle"
          color={theme.colors.error}
          onPress={() => removeBookmark(bookmark)}
        />
      )}
    />
  );
}

export default BookmarkListItem;
