import * as React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import BottomTab from './src/navigation/BottomTab'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0D1821'
  },
};


export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}