import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// 네이티브 스택 내비게이터와 하단 탭 내비게이터를 함께 사용하기
/* 
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#fb8c00',
          showLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: '검색',
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: '알림',
            tabBarIcon: ({color, size}) => (
              <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            title: '메시지',
            tabBarIcon: ({color, size}) => (
              <Icon name="message" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

*/

// 드로어 내비게이터
/*

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="Setting 열기"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}

function SettingScreen({navigation}) {
  return (
    <View>
      <Text>Setting</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="left"
      backBehavior="history"
      drawerContent={({navigation}) => (
        <SafeAreaView>
          <Text>A Custom Drawer</Text>
          <Button
            onPress={() => navigation.closeDrawer()}
            title="Drawer 닫기"/>
        </SafeAreaView>
      )}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '홈'}}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{title: '설정'}}
      />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}
 */


//  네이티브 스택 네비게이터 실습 코드
/** 
 * import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import DetailScreen from './screen/DetailScreen';
import HeaderlessScreen from './screen/HeaderlessScreen';

function App() {

  const Stack = createNativeStackNavigator();

  return <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen}   
          options={{
            title: '홈',
          }}/>
        <Stack.Screen name='Detail' component={DetailScreen}
          options={{
            headerBackVisible: false,
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Text>Left</Text>
              </TouchableOpacity>
            ),
            headerTitle: ({children}) => (
              <View>
                <Text>{children}</Text>
              </View>
            ),
            headerRight: () => (
              <View>
                <Text>Right</Text>
              </View>
            ),
          }} />
          <Stack.Screen 
            name='Headerless'
            component={HeaderlessScreen}
            options={{
              headerShown: false,
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>;
}

export default App;
 */