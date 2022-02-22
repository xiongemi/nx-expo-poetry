import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppRoutes } from '../shared/app-routes.enum';
import { PoemCard } from '../shared/poem-card/poem-card';

import {
  mapDispatchToProps,
  mapStateToProps,
  PoemOfTheDayProps,
} from './poem-of-the-day.props';

export function PoemOfTheDay({
  poem,
  fetchPoemOfTheDay,
  bookmark,
  loadingStatus,
}: PoemOfTheDayProps) {
  const date = new Date();
  const formattedDate = format(date, 'MMMM do, yyyy');
  const navigation = useNavigation();

  useEffect(() => {
    fetchPoemOfTheDay();
  }, [fetchPoemOfTheDay]);

  return (
    <PoemCard
      fetchPoemOfTheDay={fetchPoemOfTheDay}
      loadingStatus={loadingStatus}
      formattedDate={formattedDate}
      poem={poem}
      bookmark={bookmark}
      goToSearch={() => navigation.navigate(AppRoutes.Search, {search: ''})}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PoemOfTheDay);
