import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import {colors, settingNavigations} from '@/constants';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import useThemeStore from '@/store/useThemeStore';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
  [settingNavigations.DELETE_ACCOUNT]: undefined;
  [settingNavigations.EDIT_CATEGORY]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].GRAY_100,
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: colors[theme].WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
      }}>
      <Stack.Screen
        name={settingNavigations.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}: any) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={{
          headerTitle: '회원탈퇴',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_CATEGORY}
        component={EditCategoryScreen}
        options={{
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
