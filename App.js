import * as React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import BottomTab from './src/navigation/BottomTab'
import SplashScreen from 'react-native-splash-screen'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0D1821'
  },
};


export default function App() {
  React.useEffect(()=>{
    SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}