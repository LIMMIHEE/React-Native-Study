import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import { LogContextProvider } from './contexts/LogContext';
import 'react-native-get-random-values';


function Apps() {
  return (
    <NavigationContainer>
      <LogContextProvider>
          <RootStack />
      </LogContextProvider>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent(appName, () => Apps);
