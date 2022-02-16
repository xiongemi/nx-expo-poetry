import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import {
  Card,
  Paragraph,
  Subheading,
  Headline,
  Button,
} from 'react-native-paper';
import { connect } from 'react-redux';

import Loading from '../shared/loading/loading';

import {
  mapDispatchToProps,
  mapStateToProps,
  PoemOfTheDayProps,
} from './poem-of-the-day.props';

export function PoemOfTheDay({ poem, fetchPoemOfTheDay }: PoemOfTheDayProps) {
  const date = new Date();

  const formattedDate = format(date, 'MMMM do, yyyy');

  useEffect(() => {
    fetchPoemOfTheDay();
  }, [fetchPoemOfTheDay]);

  return poem ? (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Card>
          <Card.Title
            title={poem?.title}
            subtitle={formattedDate}
            children={undefined}
          />
          <Card.Cover source={{ uri: `https://picsum.photos/300/200` }} />
          <Card.Actions>
            <Button icon="heart-plus">Bookmark</Button>
            <Button icon="skip-next">Next</Button>
            <Button icon="magnify">Search</Button>
          </Card.Actions>
          <Card.Content>
            <Headline>{poem?.title}</Headline>
            <Subheading>
              <Text>
                By:
                {poem?.author?.split(',')?.map((author) => (
                  <Button onPress={() => console.log('Pressed')}>
                    {author}
                  </Button>
                ))}
              </Text>
            </Subheading>
            <Paragraph>{poem?.lines?.map((line) => line + '\n')}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Loading />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PoemOfTheDay);
