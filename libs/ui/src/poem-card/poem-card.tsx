import { LoadingStatus, Poem } from '@nx-expo-poetry/models';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Card,
  Paragraph,
  Headline,
  Button,
  Snackbar,
} from 'react-native-paper';

import Centre from '../centre/centre';
import FullHeight from '../full-height/full-height';
import ShowLoading from '../show-loading/show-loading';

export interface PoemCardProps {
  loadingStatus: LoadingStatus;
  formattedDate: string;
  poem?: Poem;
  bookmark: (formattedDate: string, poem: Poem) => void;
  fetchPoemOfTheDay: () => void;
}

export function PoemCard({
  loadingStatus,
  formattedDate,
  poem,
  bookmark,
  fetchPoemOfTheDay,
}: PoemCardProps) {
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
              !poem || ['not loaded' || 'loading'].includes(loadingStatus)
            }
          >
            <Card>
              <Card.Title
                title={poem?.title}
                subtitle={formattedDate}
                children={undefined}
              />
              <Card.Cover source={{ uri: `https://picsum.photos/300/200` }} />
              <Card.Actions>
                <Button icon="heart-plus" onPress={onBookmarkPoem}>
                  Bookmark
                </Button>
                <Button icon="skip-next" onPress={() => fetchPoemOfTheDay()}>
                  Next
                </Button>
                <Button icon="magnify">Search</Button>
              </Card.Actions>
              <Card.Content>
                <Centre>
                  <Headline>{poem?.title}</Headline>
                  {poem?.author?.split(',')?.map((author, index) => (
                    <Button key={index} onPress={() => console.log('Pressed')}>
                      {author}
                    </Button>
                  ))}
                </Centre>
                <Paragraph>{poem?.lines?.map((line) => line + '\n')}</Paragraph>
              </Card.Content>
            </Card>
          </ShowLoading>
        </ScrollView>
      </SafeAreaView>
      <Snackbar visible={bookmarked} onDismiss={() => setBookmarked(false)}>
        Poem bookmarked!
      </Snackbar>
    </FullHeight>
  );
}
