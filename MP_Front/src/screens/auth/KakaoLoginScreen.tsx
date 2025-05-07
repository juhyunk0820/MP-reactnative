import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';
import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

const REDIRECT_URI = `${
  Platform.OS === 'ios'
    ? 'http://localhost:3030/auth/oauth/kakao'
    : 'http://10.0.2.2:3030/auth/oauth/kakao'
}`;

function KakaoLoginScreen() {
  const {kakaoLoginMutation} = useAuth();
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log('handleOnMessage');
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    console.log(response.data);
    kakaoLoginMutation.mutate(response.data.access_token);
  };

  const handleNavigationChangeState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size={'large'} color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </SafeAreaView>
  );
}

export default KakaoLoginScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    kakaoLoadingContainer: {
      backgroundColor: colors[theme].WHITE,
      height: Dimensions.get('window').height,
      paddingBottom: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
