import {
  BOOKMARKS_FEATURE_KEY,
  createRootStore,
  transformEntityStateToPersist,
} from '@nx-expo-poetry/store';
import { Loading } from '@nx-expo-poetry/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import {
  DefaultTheme,
  IconButton,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Bookmarks from './bookmarks/bookmarks';
import PoemOfTheDay from './poem-of-the-day/poem-of-the-day';
import Search from './search/search';
import { AppRoutes } from './shared/app-routes.enum';
import { RootStackParamList } from './shared/root-stack-param-list.type';

const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [BOOKMARKS_FEATURE_KEY],
    transforms: [transformEntityStateToPersist],
  };
  const history: History = createMemoryHistory();
  const { store, persistor } = createRootStore(persistConfig, history);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#855913',
      accent: '#aec5c5',
    },
  };

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={AppRoutes.PoemOfTheDay}>
              <Stack.Screen
                name={AppRoutes.PoemOfTheDay}
                component={PoemOfTheDay}
                options={({ navigation }) => ({
                  headerRight: () => (
                    <IconButton
                      icon="bookmark"
                      onPress={() => navigation.navigate(AppRoutes.Bookmarks)}
                    />
                  ),
                })}
              />
              <Stack.Screen name={AppRoutes.Bookmarks} component={Bookmarks} />
              <Stack.Screen name={AppRoutes.Search} component={Search} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
