import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';

import theme from './src/global/themes/theme';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import { AuthProvider } from './src/hooks/auth';


export default function App() {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      {/* <NavigationContainer>
        <AppRoutes />
      </NavigationContainer> */}
    </ThemeProvider>
  );
}
