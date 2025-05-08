import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';
import {Alert, StatusBar} from 'react-native';
import {colors} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import Config from 'react-native-config';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors['light'].BLUE_500}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors['light'].RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App() {
  const {theme} = useThemeStorage();
  Alert.alert(Config.GOOGLE_API_KEY);
  Alert.alert(Config.KAKAO_REST_API_KEY);
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
