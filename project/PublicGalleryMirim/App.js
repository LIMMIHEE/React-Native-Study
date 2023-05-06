import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootStack from './screens/RootStack';
import { UserCreateProvider } from './contexts/UserContext';

function App() {
  return (
    <UserCreateProvider>
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
    </UserCreateProvider>
  )
}

export default App;
