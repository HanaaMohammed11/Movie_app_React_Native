import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import Home from "../component/Home"; 
import Details from "../component/details"; 

import Taps from './Tab';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: styles.cardStyle,
      }}
    >
      <Stack.Screen name="Home" component={Taps} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardStyle: {
    backgroundColor: '#2c3e50',
  },
});

export default StackNavigation;
