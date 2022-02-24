import { Poem } from '@nx-expo-poetry/models';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppRoutes } from '../shared/app-routes.enum';
import { PoemCard } from '../shared/poem-card/poem-card';

import {
  mapDispatchToProps,
  mapStateToProps,
  BookmarkProps,
} from './bookmark.props';

export function PoemResult({ poem, fetchBookmark, bookmark }: BookmarkProps) {
  const date = new Date();

  const navigation = useNavigation();
  const route = useRoute<
    RouteProp<{
      params: { formattedDate: string; title: string; author: string };
    }>
  >();
  const title = route.params?.title;
  const author = route.params?.author;
  const formattedDate =
    route.params?.formattedDate || format(date, 'MMMM do, yyyy');

  useEffect(() => {
    if (title) {
      fetchBookmark(title, author);
    }
  }, [title, author, fetchBookmark]);

  return (
    <PoemCard
      loadingStatus={'loaded'}
      formattedDate={formattedDate}
      poem={poem}
      bookmark={bookmark}
      goToSearch={(searchQuery: string) =>
        navigation.navigate(AppRoutes.Search, { search: searchQuery })
      }
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PoemResult);
