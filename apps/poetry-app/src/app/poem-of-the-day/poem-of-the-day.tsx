import { PoemCard } from '@nx-expo-poetry/ui';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PoemOfTheDay);
