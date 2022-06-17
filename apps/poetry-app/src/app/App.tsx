import { Ionicons } from '@expo/vector-icons';
import {
  BOOKMARKS_FEATURE_KEY,
  createRootStore,
  transformEntityStateToPersist,
} from '@nx-expo-poetry/store';
import { Loading, AppRoutes, RootStackParamList } from '@nx-expo-poetry/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import {
  DefaultTheme,
  IconButton,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Bookmark from './bookmark/bookmark';
import Bookmarks from './bookmarks/bookmarks';
import PoemOfTheDay from './poem-of-the-day/poem-of-the-day';
import PoemResult from './poem-result/poem-result';
import Search from './search/search';

const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [BOOKMARKS_FEATURE_KEY],
    transforms: [transformEntityStateToPersist],
  };
  const history: History = createMemoryHistory();
  const { store, persistor } = createRootStore(persistConfig, history);
  
  const [loaded] = useFonts({
    Joan: require('../../assets/Joan-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

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
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props: any) => <Ionicons {...props} />,
      }}
    >
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StoreProvider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={AppRoutes.PoemOfTheDay}>
              <Stack.Screen
                name={AppRoutes.PoemOfTheDay}
                component={PoemOfTheDay}
                options={({ navigation }) => ({
                  headerRight: () => (
                    <IconButton
                      icon="book"
                      onPress={() => navigation.navigate(AppRoutes.Bookmarks)}
                    />
                  ),
                })}
              />
              <Stack.Screen name={AppRoutes.Bookmarks} component={Bookmarks} />
              <Stack.Screen name={AppRoutes.Search} component={Search} />
              <Stack.Screen name={AppRoutes.Result} component={PoemResult} />
              <Stack.Screen name={AppRoutes.Bookmark} component={Bookmark} />
            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </PersistGate>
    </PaperProvider>
  );
};

export default App;
