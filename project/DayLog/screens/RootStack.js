import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "./MainTab";

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MainTab"
                component={MainTab}
                options={{headerShown : false}} // 헤더를 중첩되지 않도록 설ㅓ
            />
        </Stack.Navigator>
    )
}

export default RootStack;