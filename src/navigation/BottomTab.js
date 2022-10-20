import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home'
import Map from '../screens/Map'

const Tab = createBottomTabNavigator()

const BottomTab = ({ route, navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#070600'
                },
                tabBarInactiveTintColor: '#2F3E46',
                tabBarActiveTintColor: '#68C3D4'
            }}
        >

            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="home" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name='Map' component={Map} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="map" size={size} color={color} />
                )
            }}/>

        </Tab.Navigator>
    )
}

export default BottomTab