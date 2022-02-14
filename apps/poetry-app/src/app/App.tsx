import { rootStore } from '@nx-expo-poetry/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import PoemOfTheDay from './poem-of-the-day/poem-of-the-day';
import { AppRoutes } from './shared/app-routes.enum';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <StoreProvider store={rootStore}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={AppRoutes.PoemOfTheDay}>
            <Stack.Screen
              name={AppRoutes.PoemOfTheDay}
              component={PoemOfTheDay}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
