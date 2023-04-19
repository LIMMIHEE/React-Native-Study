import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "./FeedScreen";
import CalendarScreen from "./CalendarScreen";
import SearchScreen from "./SearchScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#009688'
            }}>
              <Tab.Screen
                name="Feeds"
                component={FeedScreen}
                options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="view-stream" size={size} color={color} />
                ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="event" size={size} color={color} />
                ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="search" size={size} color={color} />
                ),
                }}
            />
        </Tab.Navigator>
    )
}

function TabScreen({name, screen, iconName}) {
    return (
        <View>
            <Tab.Screen name={name}
                component={screen}
                options={
                    {
                        tabBarIcon: ({color, size}) =>{
                            <Icon name={iconName} size={size} color={color}/>
                        }
                    }
                }
            />
        </View>
    )
}

export default MainTab;