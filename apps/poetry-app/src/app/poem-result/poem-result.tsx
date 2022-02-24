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
  PoemResultProps,
} from './poem-result.props';

export function PoemResult({ searchResultById, bookmark }: PoemResultProps) {
  const date = new Date();

  const [poem, setPoem] = useState<Poem>();

  const navigation = useNavigation();
  const route = useRoute<
    RouteProp<{
      params: { id: string };
    }>
  >();
  const id = route.params?.id;
  const formattedDate = format(date, 'MMMM do, yyyy');

  useEffect(() => {
    if (id) {
      setPoem(searchResultById(id)?.poem);
    }
  }, [id, searchResultById]);

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
