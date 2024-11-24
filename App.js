import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import RestaurantScreen from './components/RestaurantScreen';
import SplashScreen from './components/SplashScreen';

const Nov = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Nov.Navigator>
          <Nov.Screen name="Home" component={HomeScreen} />
        </Nov.Navigator>
      </NavigationContainer>
  );
}
