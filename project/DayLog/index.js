import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import 'react-native-get-random-values';
import { SearchContextProvider } from './contexts/SearchContext';


function Apps() {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
            <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent(appName, () => Apps);
