import { LoadingStatus, Poem } from '@nx-expo-poetry/models';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Card,
  Paragraph,
  Headline,
  Button,
  Snackbar,
} from 'react-native-paper';

import { AppRoutes } from '../app-routes.enum';
import Centre from '../centre/centre';
import FullHeight from '../full-height/full-height';
import ShowLoading from '../show-loading/show-loading';

export interface PoemCardProps {
  loadingStatus: LoadingStatus;
  formattedDate: string;
  bookmark: (formattedDate: string, poem: Poem) => void;
  poem?: Poem;
  fetch?: () => void;
  goToSearch: (searchQuery: string) => void;
}

export function PoemCard({
  loadingStatus,
  formattedDate,
  poem,
  bookmark,
  fetch,
  goToSearch,
}: PoemCardProps) {
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const onBookmarkPoem = () => {
    if (!poem) return;
    bookmark(formattedDate, poem);
    setBookmarked(true);
  };

  return (
    <FullHeight>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <ShowLoading
            showLoading={
              loadingStatus === 'not loaded' || loadingStatus === 'loading'
            }
            hasError={loadingStatus === 'error'}
            reload={fetch}
          >
            <Card>
              <Card.Title
                title={poem?.title}
                subtitle={formattedDate}
                children={undefined}
              />
              <Card.Cover source={{ uri: `https://picsum.photos/300/200` }} />
              <Card.Actions>
                <Button icon="heart-outline" onPress={onBookmarkPoem}>
                  Bookmark
                </Button>
                {fetch && (
                  <Button
                    icon="play-skip-forward-outline"
                    onPress={() => fetch()}
                  >
                    Next
                  </Button>
                )}
                {goToSearch && (
                  <Button icon="search" onPress={() => goToSearch('')}>
                    Search
                  </Button>
                )}
              </Card.Actions>
              <Card.Content>
                <Centre>
                  <Headline>{poem?.title}</Headline>
                  {poem?.author?.split(',')?.map((author, index) => (
                    <Button key={index} onPress={() => goToSearch(author)}>
                      {author}
                    </Button>
                  ))}
                </Centre>
                <Paragraph style={{ fontFamily: 'Joan' }}>
                  {poem?.lines?.map((line) => line + '\n')}
                </Paragraph>
              </Card.Content>
            </Card>
          </ShowLoading>
        </ScrollView>
      </SafeAreaView>
      <Snackbar
        visible={bookmarked}
        onDismiss={() => setBookmarked(false)}
        duration={5000}
        action={{
          label: 'View All',
          onPress: () => navigation.navigate(AppRoutes.Bookmarks),
        }}
      >
        Poem bookmarked!
      </Snackbar>
    </FullHeight>
  );
}
