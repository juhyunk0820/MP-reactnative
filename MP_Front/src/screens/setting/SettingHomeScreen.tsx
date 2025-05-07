import DarkModeOption from '@/components/setting/DarkModeOption';
import MapLegendOption from '@/components/setting/MapLegendOption';
import SettingItem from '@/components/setting/SettingItem';
import {colors, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type SettingHomeScreenProps = StackScreenProps<
  SettingStackParamList,
  typeof settingNavigations.SETTING_HOME
>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {logoutMutation} = useAuth();
  const darkModeOption = useModal();
  const mapLegendOption = useModal();

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem
          title="마커 카테고리 수정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="다크모드" onPress={darkModeOption.show} />
        <SettingItem title="범례표시" onPress={mapLegendOption.show} />

        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors[theme].RED_500}
          onPress={handlePressLogout}
          icon={
            <Octicons
              name={'sign-out'}
              color={colors[theme].RED_500}
              size={16}
            />
          }
        />
        <DarkModeOption
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
        />
        {/* <MapLegendOption
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingHomeScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    space: {
      height: 20,
    },
  });
