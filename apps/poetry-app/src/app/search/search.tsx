import { Centre, PoemListItem, ShowLoading } from '@nx-expo-poetry/ui';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Headline, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import {
  mapDispatchToProps,
  mapStateToProps,
  SearchProps,
} from './search.props';

export function Search({ poems, loadingStatus, fetchSearch }: SearchProps) {
  const route = useRoute<RouteProp<{ params: { search: string } }>>();
  const searchParam = route.params?.search;
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    if (searchParam && searchParam.length) {
      setSearchQuery(searchParam);
      fetchSearch(searchParam);
    }
  }, [fetchSearch, searchParam]);

  const onSearchQueryChange = (text: string) => {
    setSearchQuery(text);
    if (text && text.length > 3) {
      fetchSearch(text);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Searchbar
          placeholder="Search any poem or author"
          onChangeText={onSearchQueryChange}
          value={searchQuery}
          children={undefined}
          autoComplete={undefined}
        />
        <ShowLoading
          showLoading={loadingStatus === 'loading'}
          hasError={loadingStatus === 'error'}
          reload={() => onSearchQueryChange(searchQuery)}
        >
          {searchQuery && searchQuery.length > 3 ? (
            poems && poems.length ? (
              poems.map((poem, index) => (
                <PoemListItem
                  key={index + encodeURIComponent(poem.title)}
                  poem={poem}
                />
              ))
            ) : (
              <Centre>
                <Headline>Nothing found~</Headline>
              </Centre>
            )
          ) : (
            <></>
          )}
        </ShowLoading>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
