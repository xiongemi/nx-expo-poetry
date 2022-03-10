import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Headline, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import { AppRoutes } from '../shared/app-routes.enum';
import Centre from '../shared/centre/centre';
import PoemListItem from '../shared/poem-list-item/poem-list-item';
import ShowLoading from '../shared/show-loading/show-loading';
import Spacing from '../shared/spacing/spacing';

import {
  mapDispatchToProps,
  mapStateToProps,
  SearchProps,
} from './search.props';

export function Search({
  searchEntities,
  loadingStatus,
  fetchSearch,
}: SearchProps) {
  const navigation = useNavigation();
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
          placeholder="Search any poem title or author"
          onChangeText={onSearchQueryChange}
          value={searchQuery}
          children={undefined}
          autoComplete={undefined}
          icon="search"
          clearIcon="close"
        />
        <ShowLoading
          showLoading={loadingStatus === 'loading'}
          hasError={loadingStatus === 'error'}
          reload={() => onSearchQueryChange(searchQuery)}
        >
          {searchQuery && searchQuery.length > 3 ? (
            searchEntities && searchEntities.length ? (
              searchEntities.map((searchEntity) => (
                <PoemListItem
                  key={searchEntity.id}
                  poem={searchEntity.poem}
                  onPress={() =>
                    navigation.navigate(AppRoutes.Result, {
                      id: searchEntity.id,
                    })
                  }
                />
              ))
            ) : (
              <Centre>
                <Spacing>
                  <Avatar.Icon size={40} icon="alert" children={undefined} />
                </Spacing>
                <Headline>Nothing found~</Headline>
              </Centre>
            )
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </ShowLoading>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
