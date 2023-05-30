import { BookmarksEntity } from '@nx-expo-poetry/store';
import { AppRoutes, Centre, FullHeight, Spacing } from '@nx-expo-poetry/ui';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Avatar, Divider, Headline, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';

import BookmarkListItem from './bookmark-list-item/bookmark-list-item';
import {
  mapStateToProps,
  mapDispatchToProps,
  BookmarksProps,
} from './bookmarks.props';

export function Bookmarks({
  bookmarks,
  removeBookmark,
  addBookmark,
}: BookmarksProps) {
  const navigation = useNavigation();
  const [showRemoveSnackbar, setShowRemoveSnackbar] = useState<boolean>(false);
  const [currentlyRemovedBookmark, setCurrentlyRemovedBookmark] =
    useState<BookmarksEntity>();

  const onRemoveBookmark = (bookmark: BookmarksEntity) => {
    removeBookmark(bookmark);
    setCurrentlyRemovedBookmark(bookmark);
    setShowRemoveSnackbar(true);
  };

  return (
    <FullHeight>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {bookmarks && bookmarks?.length ? (
            bookmarks.map(
              (bookmark: BookmarksEntity) =>
                bookmark &&
                bookmark.poem && (
                  <View key={bookmark.id}>
                    <BookmarkListItem
                      bookmark={bookmark}
                      removeBookmark={onRemoveBookmark}
                      onPress={() =>
                        navigation.navigate(AppRoutes.Bookmark, {
                          formattedDate: bookmark.formattedDate,
                          title: bookmark.poem.title,
                          author: bookmark.poem.author,
                        })
                      }
                    />
                    <Divider />
                  </View>
                )
            )
          ) : (
            <Centre>
              <Spacing>
                <Avatar.Icon size={40} icon="book" children={undefined} />
              </Spacing>
              <Spacing>
                <Headline>No poems bookmarked~</Headline>
              </Spacing>
            </Centre>
          )}
        </ScrollView>
      </SafeAreaView>
      <Snackbar
        visible={showRemoveSnackbar}
        onDismiss={() => setShowRemoveSnackbar(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            if (currentlyRemovedBookmark) {
              addBookmark(currentlyRemovedBookmark);
            }
          },
        }}
      >
        <Text>
          Remove {currentlyRemovedBookmark?.poem?.title?.substring(0, 10)} ...
        </Text>
      </Snackbar>
    </FullHeight>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
