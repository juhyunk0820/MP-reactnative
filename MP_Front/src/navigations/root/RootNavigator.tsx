import React, {useEffect} from 'react';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import SplashScreen from 'react-native-splash-screen';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if (!isLoginLoading) {
      SplashScreen.hide();
    }
  }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
