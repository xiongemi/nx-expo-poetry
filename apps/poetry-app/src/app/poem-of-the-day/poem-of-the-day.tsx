import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Subheading } from 'react-native-paper';
import { connect } from 'react-redux';

import Loading from '../shared/loading/loading';

import {
  mapDispatchToProps,
  mapStateToProps,
  PoemOfTheDayProps,
} from './poem-of-the-day.props';

export function PoemOfTheDay({ poem, fetchPoemOfTheDay }: PoemOfTheDayProps) {
  useEffect(() => {
    fetchPoemOfTheDay();
  }, [fetchPoemOfTheDay]);

  return poem ? (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Card>
          <Card.Cover source={{ uri: `https://picsum.photos/300/200` }} />
          <Card.Content>
            <Title>{poem?.title}</Title>
            <Subheading>By: {poem?.author}</Subheading>
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
